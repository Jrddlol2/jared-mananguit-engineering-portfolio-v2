#!/usr/bin/env node
// No bundler needed for a dependency-free static site — "build" just assembles
// a clean deployable copy in dist/, excluding source-only files.
import { cpSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const INCLUDE = ['index.html', 'css', 'js', 'projects', 'assets', 'Jared_Mananguit_Resume.pdf', 'robots.txt', 'sitemap.xml'];

rmSync(dist, { recursive: true, force: true });

for (const entry of INCLUDE) {
  const src = join(root, entry);
  if (!existsSync(src)) continue;
  cpSync(src, join(dist, entry), { recursive: true });
}

console.log(`Build output written to ${dist}`);
