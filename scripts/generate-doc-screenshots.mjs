#!/usr/bin/env node
// Documentation screenshot generator for docs/images/{desktop,tablet,mobile}.
// Separate from docs/screenshot-*.png (flat files referenced directly by
// README.md) — this produces a parallel, organized asset library and does
// not touch or remove anything README depends on.
import { chromium, devices } from '@playwright/test';
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_ROOT = join(root, 'docs', 'images');
const BASE_URL = process.env.CAPTURE_BASE_URL || 'http://localhost:8080';

const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const TABLET_VIEWPORT = { width: 834, height: 1194 };
const MOBILE_DEVICE = { ...devices['iPhone 15 Pro'], viewport: { width: 393, height: 852 } };

// Wipe and recreate each output folder so every run reflects only the
// current capture set — no stale images left over from a prior run.
for (const sub of ['desktop', 'tablet', 'mobile']) {
  const dir = join(OUT_ROOT, sub);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}

async function withPage(contextOptions, fn) {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  try {
    await fn(page);
  } finally {
    await browser.close();
  }
}

async function setTheme(page, url, theme) {
  await page.goto(url);
  await page.evaluate((t) => localStorage.setItem('theme', t), theme);
  await page.reload();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
}

async function scrollTo(page, selector, block = 'start') {
  if (!selector) return;
  await page.evaluate(({ sel, blockPos }) => {
    document.querySelector(sel)?.scrollIntoView({ block: blockPos });
    window.dispatchEvent(new Event('scroll'));
  }, { sel: selector, blockPos: block });
}

async function shoot(page, outPath, { fullPage = false, clip, elementSelector } = {}) {
  let buf;
  if (elementSelector) {
    const el = await page.$(elementSelector);
    buf = await el.screenshot();
  } else {
    buf = await page.screenshot({ fullPage, clip });
  }
  writeFileSync(outPath, buf);
  console.log(`Wrote ${outPath.replace(root + '\\', '').replace(root + '/', '')}`);
}

const generated = [];
function track(dir, name) {
  generated.push(`docs/images/${dir}/${name}`);
  return join(OUT_ROOT, dir, name);
}

// ---------------------------------------------------------------- Desktop
await withPage({ viewport: DESKTOP_VIEWPORT }, async (page) => {
  await setTheme(page, `${BASE_URL}/index.html`, 'light');
  await shoot(page, track('desktop', 'homepage.png'));

  await scrollTo(page, '#sec-introduction');
  await page.waitForTimeout(700);
  await shoot(page, track('desktop', 'about.png'));

  await scrollTo(page, '#sec-characteristics');
  await page.waitForTimeout(700);
  await shoot(page, track('desktop', 'skills.png'));

  await scrollTo(page, '#sec-experience');
  await page.waitForTimeout(900);
  await shoot(page, track('desktop', 'experience.png'));
  await shoot(page, track('desktop', 'timeline.png'), { elementSelector: '#sec-experience .spec-table' });

  await scrollTo(page, '#sec-projects');
  await page.waitForTimeout(900);
  await shoot(page, track('desktop', 'projects.png'));
  await shoot(page, track('desktop', 'project-cards.png'), { elementSelector: '.app-circuit-row' });

  await scrollTo(page, '.masthead__actions', 'center');
  await page.waitForTimeout(500);
  await shoot(page, track('desktop', 'contact.png'));

  await scrollTo(page, '#sec-certifications');
  await page.waitForTimeout(700);
  await shoot(page, track('desktop', 'resume-preview.png'), { elementSelector: '.cert-entry:nth-of-type(1)' });
  await shoot(page, track('desktop', 'certificate-preview.png'), { elementSelector: '.cert-entry:nth-of-type(2)' });

  // Navigation — the Contents rail on its own.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await shoot(page, track('desktop', 'navigation.png'), { elementSelector: '.bookmark-rail' });

  // Editorial scrolling — mid-scroll state, background/progress bar visible.
  await scrollTo(page, '#sec-features');
  await page.waitForTimeout(900);
  await shoot(page, track('desktop', 'editorial-scrolling.png'));

  // Dark mode.
  await page.evaluate(() => window.scrollTo(0, 0));
  await setTheme(page, `${BASE_URL}/index.html`, 'dark');
  await page.waitForTimeout(500);
  await shoot(page, track('desktop', 'dark-mode.png'));

  // Research — a project case-study page (Application Note format).
  await setTheme(page, `${BASE_URL}/projects/an-001-ball-and-beam-pid.html`, 'light');
  await shoot(page, track('desktop', 'research.png'));
});

// ----------------------------------------------------------------- Tablet
await withPage({ viewport: TABLET_VIEWPORT }, async (page) => {
  await setTheme(page, `${BASE_URL}/index.html`, 'light');
  await shoot(page, track('tablet', 'homepage.png'));

  await scrollTo(page, '#sec-projects');
  await page.waitForTimeout(900);
  await shoot(page, track('tablet', 'projects.png'));

  await scrollTo(page, '.masthead__actions', 'center');
  await page.waitForTimeout(500);
  await shoot(page, track('tablet', 'contact.png'));
});

// ----------------------------------------------------------------- Mobile
await withPage(MOBILE_DEVICE, async (page) => {
  await setTheme(page, `${BASE_URL}/index.html`, 'light');
  await shoot(page, track('mobile', 'homepage.png'));

  await scrollTo(page, '#sec-introduction');
  await page.waitForTimeout(700);
  await shoot(page, track('mobile', 'about.png'));

  await scrollTo(page, '#sec-projects');
  await page.waitForTimeout(900);
  await shoot(page, track('mobile', 'projects.png'));

  await scrollTo(page, '.masthead__actions', 'center');
  await page.waitForTimeout(500);
  await shoot(page, track('mobile', 'contact.png'));

  await setTheme(page, `${BASE_URL}/index.html`, 'light');
  await page.click('.toc-mobile summary');
  await page.evaluate(() => document.querySelector('.toc-mobile')?.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(500);
  await shoot(page, track('mobile', 'navigation.png'));

  await setTheme(page, `${BASE_URL}/index.html`, 'dark');
  await page.waitForTimeout(500);
  await shoot(page, track('mobile', 'dark-mode.png'));
});

console.log(`\nGenerated ${generated.length} screenshots:`);
for (const f of generated) console.log(` - ${f}`);
