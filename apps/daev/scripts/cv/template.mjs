// HTML del CV: A4, una página, dos columnas (barra lateral + cuerpo).

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function renderCv(c, assets) {
  const contactRows = [
    ['✉', c.contact.email, `mailto:${c.contact.email}`],
    ['☏', c.contact.phone, `tel:${c.contact.phone.replace(/\s/g, '')}`],
    ['⌂', c.contact.web, `https://${c.contact.web}`],
    ['in', c.contact.linkedin, `https://${c.contact.linkedin}`],
    ['gh', c.contact.github, `https://${c.contact.github}`],
  ];

  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<title>${esc(c.name)} — CV</title>
<style>
${assets.fonts.map((f) => `@font-face { font-family: Inter; font-weight: ${f.weight}; src: url(data:font/ttf;base64,${f.data}) format('truetype'); }`).join('\n')}
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --ink: #0f172a; --muted: #475569; --soft: #64748b; --accent: #0891b2; --side: #0b1320; --line: #e2e8f0; }
  html, body { width: 210mm; height: 297mm; overflow: hidden; }
  body { font-family: Inter, system-ui, sans-serif; color: var(--ink); font-size: 8.4pt; line-height: 1.38;
         display: grid; grid-template-columns: 66mm 1fr; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  a { color: inherit; text-decoration: none; }

  aside { background: var(--side); color: #cbd5e1; padding: 11mm 7mm 9mm; display: flex; flex-direction: column; gap: 4.6mm; }
  .photo { width: 34mm; height: 34mm; border-radius: 50%; object-fit: cover; border: 2px solid #22d3ee; align-self: center; }
  aside h2 { font-size: 7.4pt; letter-spacing: .14em; text-transform: uppercase; color: #22d3ee; font-weight: 700;
             padding-bottom: 1.4mm; margin-bottom: 2mm; border-bottom: 1px solid rgba(148,163,184,.25); }
  .contact li { list-style: none; display: flex; gap: 2.2mm; align-items: baseline; margin-bottom: 1.2mm; font-size: 8pt; word-break: break-all; }
  .contact .ic { width: 4mm; flex-shrink: 0; color: #22d3ee; font-weight: 700; font-size: 7pt; text-align: center; }
  .numbers { display: grid; gap: 2mm; }
  .numbers div { display: flex; align-items: baseline; gap: 2.4mm; }
  .numbers b { font-size: 15pt; color: #fff; font-weight: 700; min-width: 13mm; }
  .numbers span { font-size: 8pt; }
  .skill { margin-bottom: 1.8mm; }
  .skill b { display: block; color: #fff; font-size: 8pt; font-weight: 600; }
  .skill span { font-size: 7.8pt; }
  .lang { font-size: 8pt; margin-bottom: .8mm; }
  .lang b { color: #fff; font-weight: 600; }

  main { padding: 10mm 10mm 8mm 9mm; display: flex; flex-direction: column; gap: 3.6mm; }
  header h1 { font-size: 21pt; line-height: 1.1; letter-spacing: -.02em; font-weight: 700; }
  header .title { font-size: 11pt; color: var(--accent); font-weight: 600; margin-top: 1mm; }
  header .loc { font-size: 8.2pt; color: var(--soft); margin-top: .6mm; }
  main h2 { font-size: 8pt; letter-spacing: .14em; text-transform: uppercase; color: var(--accent); font-weight: 700;
            padding-bottom: 1.2mm; margin-bottom: 2.2mm; border-bottom: 1px solid var(--line); }
  .profile { color: var(--muted); text-align: justify; hyphens: auto; }
  .job { margin-bottom: 2.6mm; break-inside: avoid; }
  .job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
  .job-head b { font-size: 9.4pt; font-weight: 700; }
  .job-head .period { font-size: 7.8pt; color: var(--soft); white-space: nowrap; font-weight: 500; }
  .company { font-size: 8.4pt; color: var(--accent); font-weight: 600; }
  .company span { color: var(--soft); font-weight: 400; }
  .job ul { margin-top: 1mm; padding-left: 3.6mm; color: var(--muted); }
  .job li { margin-bottom: .3mm; }
  .job li::marker { color: var(--accent); }
  .edu { display: flex; gap: 3mm; margin-bottom: .8mm; color: var(--muted); }
  .edu .period { min-width: 19mm; color: var(--soft); font-size: 7.8pt; white-space: nowrap; }
  .edu b { color: var(--ink); font-weight: 600; }
  .research div { display: flex; gap: 2.4mm; font-size: 7.8pt; margin-bottom: 1.4mm; }
  .research b { color: #fff; font-weight: 600; min-width: 7mm; }
</style>
</head>
<body>
<aside>
  <img class="photo" src="${assets.photo}" alt="">
  <section>
    <h2>${esc(c.labels.contact)}</h2>
    <ul class="contact">
      ${contactRows.map(([ic, text, href]) => `<li><span class="ic">${ic}</span><a href="${href}">${esc(text)}</a></li>`).join('')}
    </ul>
  </section>
  <section>
    <h2>${esc(c.labels.numbers)}</h2>
    <div class="numbers">
      ${c.numbers.map((n) => `<div><b>${esc(n.value)}</b><span>${esc(n.label)}</span></div>`).join('')}
    </div>
  </section>
  <section>
    <h2>${esc(c.labels.skills)}</h2>
    ${c.skills.map((s) => `<div class="skill"><b>${esc(s.group)}</b><span>${esc(s.items)}</span></div>`).join('')}
  </section>
  <section>
    <h2>${esc(c.labels.languages)}</h2>
    ${c.languages.map((l) => `<div class="lang"><b>${esc(l.name)}</b> — ${esc(l.level)}</div>`).join('')}
  </section>
  <section class="research">
    <h2>${esc(c.labels.research)}</h2>
    ${c.research.map((r) => `<div><b>${esc(r.year)}</b><span>${esc(r.text)}</span></div>`).join('')}
  </section>
</aside>
<main>
  <header>
    <h1>${esc(c.name)}</h1>
    <div class="title">${esc(c.title)}</div>
    <div class="loc">${esc(c.location)}</div>
  </header>
  <section>
    <h2>${esc(c.labels.profile)}</h2>
    <p class="profile">${esc(c.profile)}</p>
  </section>
  <section>
    <h2>${esc(c.labels.experience)}</h2>
    ${c.experience
      .map(
        (j) => `<div class="job">
      <div class="job-head"><b>${esc(j.role)}</b><span class="period">${esc(j.period)}</span></div>
      <div class="company">${esc(j.company)}${j.detail ? ` <span>· ${esc(j.detail)}</span>` : ''}</div>
      <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
    </div>`
      )
      .join('')}
  </section>
  <section>
    <h2>${esc(c.labels.education)}</h2>
    <div class="edu-list">
      ${c.education.map((e) => `<div class="edu"><span class="period">${esc(e.period)}</span><div><b>${esc(e.title)}</b> <span>· ${esc(e.org)}</span></div></div>`).join('')}
    </div>
  </section>
</main>
</body>
</html>`;
}
