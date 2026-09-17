#!/usr/bin/env node
/**
 * Creates a new blog post from posts/_template.md.
 * Usage: npm run new-post -- "My Post Title"
 *
 * The template file is the only copy of the frontmatter shape. This script
 * used to carry its own inline duplicate, which quietly went stale the moment
 * the template grew the `topics`, `updated` and `author` fields.
 */
const fs = require('fs');
const path = require('path');

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new-post -- "My Post Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-');

const postsDir = path.join(__dirname, '..', 'posts');
const templatePath = path.join(postsDir, '_template.md');
const filePath = path.join(postsDir, `${slug}.md`);

if (!fs.existsSync(templatePath)) {
  console.error(`Template not found: ${templatePath}`);
  process.exit(1);
}
if (fs.existsSync(filePath)) {
  console.error(`File already exists: ${filePath}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const post = fs
  .readFileSync(templatePath, 'utf-8')
  .replace(/^title:.*$/m, `title: "${title.replace(/"/g, '\\"')}"`)
  .replace(/^date:.*$/m, `date: "${today}"`);

fs.writeFileSync(filePath, post);
console.log(`✓ Created: ${filePath}`);
console.log(`  Slug: ${slug}`);
console.log(`  URL:  /blog/${slug}`);
console.log('  Remember to fill in description, excerpt, image, keywords and topics.');
