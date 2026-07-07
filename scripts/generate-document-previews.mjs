#!/usr/bin/env node
// Generates cover-page preview thumbnails for the Résumé & Certifications
// publication cards (see index.html §6), so those cards show a real first
// page instead of a decorative stand-in SVG. Uses pdf-to-img (pdf.js under
// the hood) to rasterize page one directly — no browser required, and no
// dependency on Chrome's interactive PDF viewer, which does not reliably
// paint its content under headless automation.
import { pdf } from 'pdf-to-img';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(root, 'assets', 'previews');
mkdirSync(OUT_DIR, { recursive: true });

const DOCS = [
  { src: 'Jared_Mananguit_Resume.pdf', out: 'resume-cover.png' },
  {
    src: 'assets/certificates/CCNA-_Introduction_to_Networks_certificate_jaredasher-mananguit-eng-ust-edu-ph_cee7d42c-76a0-490f-b0ed-85a1c4a6bbc4.pdf',
    out: 'cert-ccna1-cover.png',
  },
  {
    src: 'assets/certificates/CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_jaredasher-mananguit-eng-ust-edu-ph_95d66144-a9a8-4f2a-b6b5-c3fda564c20f.pdf',
    out: 'cert-ccna2-cover.png',
  },
];

for (const doc of DOCS) {
  const document = await pdf(join(root, doc.src), { scale: 2 });
  const page1 = await document.getPage(1);
  writeFileSync(join(OUT_DIR, doc.out), page1);
  console.log(`Wrote assets/previews/${doc.out}`);
}

console.log('Document previews generated.');
