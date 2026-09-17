#!/usr/bin/env node
/**
 * Submits URLs to IndexNow, the ping protocol shared by Bing, Yandex, Seznam
 * and Naver. One request reaches all of them; Bing is the one that matters
 * here, because it also feeds Copilot, DuckDuckGo and Ecosia.
 *
 * Google does not participate — it still discovers changes by crawling the
 * sitemap, so this does not replace anything on that side.
 *
 * Usage:
 *   node apps/daev/scripts/indexnow.mjs                 # everything in the sitemap
 *   node apps/daev/scripts/indexnow.mjs --latest        # only the newest post
 *   node apps/daev/scripts/indexnow.mjs /blog/some-post # specific paths or URLs
 *   node apps/daev/scripts/indexnow.mjs --dry-run       # print, do not submit
 *   node apps/daev/scripts/indexnow.mjs --latest --wait # wait for the deploy first
 *
 * --wait polls each URL until it is actually live before submitting. Without
 * it, publishing a post and pinging immediately sends the engines to a URL the
 * deploy has not produced yet, and they crawl a 404.
 *
 * The key is public by design: search engines verify ownership by fetching
 * https://daev.space/<key>.txt and checking it contains the same key. That is
 * why it lives in the repo and in public/ rather than in an env var.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HOST = 'daev.space';
const SITE = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const APP_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(APP_DIR, 'public');
const POSTS_DIR = path.join(APP_DIR, 'posts');

function findKey() {
  // The key file is the source of truth: whatever <key>.txt sits in public/ is
  // what the search engines will fetch to verify us, so the script reads it
  // instead of keeping a second copy that could drift.
  const candidates = fs
    .readdirSync(PUBLIC_DIR)
    .filter((f) => /^[a-zA-Z0-9-]{8,128}\.txt$/.test(f) && f !== 'llms.txt');

  if (candidates.length === 0) {
    throw new Error(
      `No IndexNow key file in ${PUBLIC_DIR}.\n` +
        'Create one with:  node -e "const k=require(\'crypto\').randomUUID().replace(/-/g,\'\');' +
        "require('fs').writeFileSync(`apps/daev/public/${k}.txt`,k);console.log(k)\""
    );
  }
  if (candidates.length > 1) {
    throw new Error(`More than one key file in public/: ${candidates.join(', ')}`);
  }

  const file = candidates[0];
  const key = file.replace(/\.txt$/, '');
  const contents = fs.readFileSync(path.join(PUBLIC_DIR, file), 'utf-8').trim();
  if (contents !== key) {
    throw new Error(`${file} must contain exactly "${key}", found "${contents}"`);
  }
  return key;
}

async function urlsFromSitemap() {
  // Read the deployed sitemap rather than re-deriving the routes: submitting a
  // URL that is not live yet just earns a crawl that 404s.
  const response = await fetch(`${SITE}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`GET ${SITE}/sitemap.xml -> ${response.status}`);
  }
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

/**
 * URL of the most recently dated post, read from the files on disk. An earlier
 * version took the first blog entry out of the deployed sitemap and assumed it
 * was the newest — it was whatever order that deploy happened to use, which
 * made --latest submit the oldest post.
 */
function latestPostUrl() {
  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file) => {
      const frontmatter = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8').split('---')[1] ?? '';
      const match = frontmatter.match(/^date:\s*['"]?([0-9]{4}-[0-9]{2}-[0-9]{2})/m);
      return { slug: file.replace(/\.md$/, ''), date: match ? match[1] : '' };
    })
    .filter((post) => post.date)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (posts.length === 0) throw new Error(`No dated posts in ${POSTS_DIR}`);
  return `${SITE}/blog/${posts[0].slug}`;
}

/** Polls a URL until it responds 200, or gives up. */
async function waitUntilLive(url, { timeoutMs = 10 * 60 * 1000, intervalMs = 15000 } = {}) {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    try {
      const response = await fetch(url, { method: 'HEAD', redirect: 'manual' });
      if (response.status === 200) return true;
    } catch {
      // Network hiccup during a deploy; keep polling.
    }
    if (Date.now() >= deadline) return false;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}

function toAbsolute(value) {
  if (/^https?:\/\//.test(value)) return value;
  return `${SITE}${value.startsWith('/') ? '' : '/'}${value}`;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const latest = args.includes('--latest');
  const wait = args.includes('--wait');
  const explicit = args.filter((arg) => !arg.startsWith('--'));

  const key = findKey();

  let urls;
  if (explicit.length > 0) {
    urls = explicit.map(toAbsolute);
  } else if (latest) {
    urls = [latestPostUrl()];
  } else {
    urls = await urlsFromSitemap();
  }

  if (urls.length === 0) {
    console.error('Nothing to submit.');
    process.exit(1);
  }

  const offSite = urls.filter((url) => !url.startsWith(SITE));
  if (offSite.length > 0) {
    throw new Error(`IndexNow only accepts URLs on ${HOST}: ${offSite.join(', ')}`);
  }

  console.log(`IndexNow · ${urls.length} URL(s) · key ${key}`);
  urls.forEach((url) => console.log('  ' + url));

  if (dryRun) {
    console.log('\n--dry-run: nothing submitted.');
    return;
  }

  if (wait) {
    console.log('\nWaiting for the deploy...');
    for (const url of urls) {
      const live = await waitUntilLive(url);
      if (!live) {
        console.error(`✗ ${url} never came up. Nothing submitted.`);
        process.exit(1);
      }
      console.log(`  live: ${url}`);
    }
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: `${SITE}/${key}.txt`,
      urlList: urls,
    }),
  });

  const body = await response.text();

  // 200 accepted, 202 accepted but key still being validated. Both are fine.
  if (response.status === 200 || response.status === 202) {
    console.log(`\n✓ ${response.status} — submitted.`);
    return;
  }

  console.error(`\n✗ ${response.status} ${response.statusText}`);
  if (body) console.error(body);
  if (response.status === 403) {
    console.error(`Key not valid: check that ${SITE}/${key}.txt is live and matches.`);
  }
  process.exit(1);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
