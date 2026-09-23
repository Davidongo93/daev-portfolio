#!/usr/bin/env node
// Capturas de proyectos backend: un backend no tiene pantalla, así que se
// muestra lo que lo hace valioso. Dos modos por entrada del spec:
//   { out, file, from, to, lang, title }  → fragmento de código en una ventana
//   { out, openapi, title }               → la especificación OpenAPI en Swagger UI
//
// Uso: node apps/daev/scripts/shots/code-card.mjs <spec.json>
// Las rutas del spec son relativas al propio spec. Salida: WebP 1280×800.
// Usa puppeteer-core (PUPPETEER_CORE, por defecto el de ~/.claude/tools) y el
// Chromium del sistema (CHROME, por defecto /usr/bin/chromium).
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { homedir } from 'node:os';

const specPath = resolve(process.argv[2] ?? '');
const base = dirname(specPath);
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
const require = createRequire(
  process.env.PUPPETEER_CORE ?? `${homedir()}/.claude/tools/package.json`
);
const puppeteer = require('puppeteer-core');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs';

function codePage({ file, from, to, lang, title }) {
  const lines = readFileSync(resolve(base, file), 'utf8').split('\n').slice(from - 1, to);
  // Quita la sangría común para que el fragmento arranque en la columna 0.
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  const code = lines.map((l) => l.slice(indent)).join('\n');
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${CDN}/highlight.js/11.9.0/styles/github-dark.min.css">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;width:1280px;height:800px;overflow:hidden}
  body{background:radial-gradient(120% 120% at 85% 0%,#0d2030 0%,#080d14 60%);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace}
  .win{width:1180px;max-height:720px;border:1px solid rgba(0,229,255,.25);border-radius:16px;background:#0b1320;box-shadow:0 30px 80px rgba(0,0,0,.55);overflow:hidden}
  .bar{display:flex;align-items:center;gap:8px;padding:14px 18px;border-bottom:1px solid rgba(148,163,184,.15);color:#94a3b8;font-size:15px}
  .dot{width:12px;height:12px;border-radius:50%}
  .title{margin-left:12px}
  pre{margin:0;padding:18px 0;font-size:${lines.length > 30 ? 15 : 17}px;line-height:1.55}
  code.hljs{background:transparent;padding:0}
  .row{display:flex}
  .ln{width:64px;padding-right:18px;text-align:right;color:#475569;user-select:none;flex-shrink:0}
</style></head><body>
<div class="win"><div class="bar"><span class="dot" style="background:#ff5f57"></span><span class="dot" style="background:#febc2e"></span><span class="dot" style="background:#28c840"></span><span class="title">${esc(title)}</span></div>
<pre><code class="hljs language-${lang}" id="c">${esc(code)}</code></pre></div>
<script src="${CDN}/highlight.js/11.9.0/highlight.min.js"></script>
<script src="${CDN}/highlight.js/11.9.0/languages/${lang}.min.js"></script>
<script>
  const el = document.getElementById('c');
  hljs.highlightElement(el);
  // Numeración de líneas: se parte el HTML resaltado por saltos de línea.
  el.innerHTML = el.innerHTML.split('\\n').map((l, i) =>
    '<div class="row"><span class="ln">' + (${from} + i) + '</span><span>' + (l || ' ') + '</span></div>').join('');
  document.fonts.ready.then(() => (window.ready = true));
</script></body></html>`;
}

function openapiPage({ openapi }) {
  const yaml = readFileSync(resolve(base, openapi), 'utf8');
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css">
<style>html,body{margin:0;background:#fff}.swagger-ui .topbar{display:none}.swagger-ui .info{margin:24px 0}</style></head><body>
<div id="ui"></div>
<script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js"></script>
<script>
  SwaggerUIBundle({ spec: jsyaml.load(${JSON.stringify(yaml)}), dom_id: '#ui', docExpansion: 'list',
    onComplete: () => setTimeout(() => (window.ready = true), 400) });
</script></body></html>`;
}

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME ?? '/usr/bin/chromium',
  args: ['--no-sandbox'],
});
try {
  for (const entry of spec) {
    // Una pestaña por captura: si se reusa, la señal `ready` del documento
    // anterior sigue viva y la captura sale antes del resaltado.
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(entry.openapi ? openapiPage(entry) : codePage(entry), {
      waitUntil: 'load',
      timeout: 60_000,
    });
    await page.waitForFunction('window.ready === true', { timeout: 20_000 });
    const out = resolve(base, entry.out);
    await page.screenshot({ path: out, type: 'webp', quality: 82 });
    console.log(`✓ ${out}`);
    await page.close();
  }
} finally {
  await browser.close();
}
