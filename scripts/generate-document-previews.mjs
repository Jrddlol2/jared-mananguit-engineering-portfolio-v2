#!/usr/bin/env node
// Generates cover-page preview thumbnails for the Résumé & Certifications
// publication cards (see index.html §6), so those cards show a real first
// page instead of a decorative stand-in SVG. Uses pdf-to-img (pdf.js under
// the hood) to rasterize page one directly — no browser required, and no
// dependency on Chrome's interactive PDF viewer, which does not reliably
// paint its content under headless automation.
//
// pdf-to-img renders at a fixed scale and always returns PNG, which is far
// larger than these cards ever need (the thumb column tops out well under
// 400px even on mobile). Re-encode through `canvas` as JPEG, capped to a
// sane max width — still crisp on retina, a fraction of the file size.
import { pdf } from 'pdf-to-img';
import { loadImage, createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(root, 'assets', 'previews');
mkdirSync(OUT_DIR, { recursive: true });

const MAX_WIDTH = 900; // comfortably covers the thumb's largest real display width, even at 2x DPR
const JPEG_QUALITY = 0.82;

const DOCS = [
  { src: 'Jared_Mananguit_Resume.pdf', out: 'resume-cover.jpg' },
  {
    src: 'assets/certificates/CCNA-_Introduction_to_Networks_certificate_jaredasher-mananguit-eng-ust-edu-ph_cee7d42c-76a0-490f-b0ed-85a1c4a6bbc4.pdf',
    out: 'cert-ccna1-cover.jpg',
  },
  {
    src: 'assets/certificates/CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_jaredasher-mananguit-eng-ust-edu-ph_95d66144-a9a8-4f2a-b6b5-c3fda564c20f.pdf',
    out: 'cert-ccna2-cover.jpg',
  },
];

for (const doc of DOCS) {
  const document = await pdf(join(root, doc.src), { scale: 2 });
  const rawPng = await document.getPage(1);

  const img = await loadImage(rawPng);
  const scale = Math.min(1, MAX_WIDTH / img.width);
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  const jpegBuf = canvas.toBuffer('image/jpeg', { quality: JPEG_QUALITY });
  writeFileSync(join(OUT_DIR, doc.out), jpegBuf);
  console.log(`Wrote assets/previews/${doc.out} (${width}x${height}, ${(jpegBuf.length / 1024).toFixed(0)} KB)`);
}

console.log('Document previews generated.');
