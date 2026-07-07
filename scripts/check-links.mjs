#!/usr/bin/env node
// Verifies that every local href/src in the site's HTML resolves to a real file.
// Acts as the project's regression test: catches broken paths after any move/rename.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlFiles = ['index.html', ...listProjectPages()];

function listProjectPages() {
  const dir = join(root, 'projects');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.html'))
    .map((f) => `projects/${f}`);
}

const REF_PATTERN = /(?:href|src)="([^"]+)"/g;
const isSkippable = (ref) =>
  ref === '' ||
  ref.startsWith('#') ||
  ref.startsWith('http://') ||
  ref.startsWith('https://') ||
  ref.startsWith('mailto:') ||
  ref.startsWith('tel:') ||
  ref.startsWith('data:') ||
  ref.startsWith('//');

let brokenCount = 0;

for (const relPath of htmlFiles) {
  const filePath = join(root, relPath);
  const content = readFileSync(filePath, 'utf8');
  const fileDir = dirname(filePath);

  for (const match of content.matchAll(REF_PATTERN)) {
    const ref = match[1].split('#')[0].split('?')[0];
    if (isSkippable(match[1])) continue;

    const target = resolve(fileDir, ref);
    if (!existsSync(target)) {
      console.error(`BROKEN LINK in ${relPath}: "${match[1]}" -> ${target}`);
      brokenCount++;
    }
  }
}

if (brokenCount > 0) {
  console.error(`\n${brokenCount} broken local reference(s) found.`);
  process.exit(1);
}

console.log(`OK — checked ${htmlFiles.length} HTML file(s), no broken local references.`);
