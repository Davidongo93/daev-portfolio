#!/usr/bin/env node
/**
 * Creates a new blog post from the template.
 * Usage: node apps/daev/scripts/new-post.js "My Post Title"
 */
const fs = require('fs');
const path = require('path');

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: node apps/daev/scripts/new-post.js "My Post Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-');

const today = new Date().toISOString().slice(0, 10);
const postsDir = path.join(__dirname, '..', 'posts');
const filePath = path.join(postsDir, `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error(`File already exists: ${filePath}`);
  process.exit(1);
}

const template = `---
title: "${title}"
date: "${today}"
description: "Short SEO description (155-160 chars)."
excerpt: "Card excerpt shown on the blog grid."
image: "/citydraw.png"
keywords: ["keyword1", "keyword2", "keyword3"]
---

Write your content here in markdown.

## Subsection

Example paragraph with **bold** and *italic* and \`inline code\`.
`;

fs.writeFileSync(filePath, template);
console.log(`✓ Created: ${filePath}`);
console.log(`  Slug: ${slug}`);
console.log(`  URL:  /blog/${slug}`);
