#!/usr/bin/env node
// Standardized mobile screenshot capture for docs/README.md: one consistent
// Playwright device context (iPhone 15 Pro width/DPR/mobile flags, viewport
// height overridden to 852 — full screen height rather than Safari's
// chrome-adjusted 659, since we render with Chrome and want maximum content
// per shot) reused for every shot, so every screenshot is byte-identical in
// size/config. Requires a static server already running (see package.json's
// "dev" script) at the URL below.
import { chromium, devices } from '@playwright/test';
import { writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'docs');
const BASE_URL = process.env.CAPTURE_BASE_URL || 'http://localhost:8082';

const device = {
  ...devices['iPhone 15 Pro'],
  viewport: { width: 393, height: 852 },
};

async function withPage(fn) {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ ...device });
  const page = await context.newPage();
  await fn(page);
  await browser.close();
}

async function shootScrolled(url, selector, outFile, { theme = 'light', extraWait = 800, block = 'start' } = {}) {
  await withPage(async (page) => {
    await page.goto(url);
    await page.evaluate((t) => {
      localStorage.setItem('theme', t);
    }, theme);
    await page.reload();
    // Wait for network to settle (fonts, SVG-heavy sections) before scrolling —
    // scrollIntoView computed against a not-yet-fully-laid-out page previously
    // undershot on long pages (the footer shot landed mid-page, not at the
    // actual footer).
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    if (selector) {
      await page.evaluate(({ sel, blockPos }) => {
        document.querySelector(sel)?.scrollIntoView({ block: blockPos });
        window.dispatchEvent(new Event('scroll'));
      }, { sel: selector, blockPos: block });
    }
    await page.waitForTimeout(extraWait);
    const buf = await page.screenshot();
    writeFileSync(join(OUT, outFile), buf);
    console.log(`Wrote ${outFile}`);
  });
}

async function shootNavExpanded(url, outFile) {
  await withPage(async (page) => {
    await page.goto(url);
    await page.evaluate(() => localStorage.setItem('theme', 'light'));
    await page.reload();
    await page.waitForTimeout(600);
    await page.click('.toc-mobile summary');
    await page.evaluate(() => {
      document.querySelector('.toc-mobile')?.scrollIntoView({ block: 'start' });
    });
    await page.waitForTimeout(500);
    const buf = await page.screenshot();
    writeFileSync(join(OUT, outFile), buf);
    console.log(`Wrote ${outFile}`);
  });
}

await shootScrolled(`${BASE_URL}/index.html`, null, 'screenshot-mobile-hero.png');
await shootNavExpanded(`${BASE_URL}/index.html`, 'screenshot-mobile-nav.png');
await shootScrolled(`${BASE_URL}/index.html`, '#sec-projects', 'screenshot-mobile-projects.png');
await shootScrolled(`${BASE_URL}/projects/an-001-ball-and-beam-pid.html`, null, 'screenshot-mobile-project-case-study.png');
await shootScrolled(`${BASE_URL}/index.html`, '#sec-characteristics', 'screenshot-mobile-skills.png');
await shootScrolled(`${BASE_URL}/index.html`, '#sec-experience', 'screenshot-mobile-experience.png', { extraWait: 1200 });
await shootScrolled(`${BASE_URL}/index.html`, '.masthead__actions', 'screenshot-mobile-contact.png', { block: 'center' });
await shootScrolled(`${BASE_URL}/index.html`, '.doc-footer', 'screenshot-mobile-footer.png');
await shootScrolled(`${BASE_URL}/index.html`, null, 'screenshot-mobile-dark.png', { theme: 'dark' });

console.log('All mobile screenshots captured.');
