#!/usr/bin/env node
// Genera los CV en PDF (ES y EN) en apps/daev/public/cv/.
// Uso: npm run cv
// Requiere Chromium en el sistema (CHROMIUM=/ruta para otro binario).
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cv } from './content.mjs';
import { renderCv } from './template.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, '../../public/cv');
const chromium = process.env.CHROMIUM || 'chromium';
const work = mkdtempSync(join(tmpdir(), 'cv-'));

// Chromium headless se cuelga esperando recursos remotos, así que la fuente y
// la foto se descargan acá y se incrustan en el HTML.
async function fetchBase64(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer()).toString('base64');
}

async function loadAssets(photoUrl) {
  const fonts = await Promise.all(
    [400, 500, 600, 700].map(async (weight) => {
      // Sin user agent, la API de Google Fonts sirve TTF.
      const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`)).text();
      const src = css.match(/src: url\((.+?)\)/)[1];
      return { weight, data: await fetchBase64(src) };
    })
  );
  return { fonts, photo: `data:image/jpeg;base64,${await fetchBase64(photoUrl)}` };
}

mkdirSync(outDir, { recursive: true });

try {
  const assets = await loadAssets(cv.es.photo);
  for (const c of Object.values(cv)) {
    const html = join(work, `${c.lang}.html`);
    const pdf = join(outDir, c.file);
    writeFileSync(html, renderCv(c, assets));
    execFileSync(
      chromium,
      [
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--no-pdf-header-footer',
        `--print-to-pdf=${pdf}`,
        `file://${html}`,
      ],
      { stdio: ['ignore', 'ignore', 'pipe'], timeout: 60_000 }
    );
    console.log(`✓ ${pdf}`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
