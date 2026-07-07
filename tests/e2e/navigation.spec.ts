import { test, expect, type Page } from '@playwright/test';

const SECTIONS = [
  'sec-introduction',
  'sec-features',
  'sec-characteristics',
  'sec-projects',
  'sec-experience',
  'sec-certifications',
];

async function collectInternalLinks(page: Page, path: string): Promise<string[]> {
  await page.goto(path);
  return page.$$eval('a[href]', (as) =>
    as
      .map((a) => a.getAttribute('href') || '')
      .filter((href) => href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#'))
  );
}

test.describe('Navigation', () => {
  test('bookmark rail lists all six sections and is visible on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    const rail = page.locator('#bookmarkRail');
    await expect(rail).toBeVisible();
    for (const id of SECTIONS) {
      await expect(rail.locator(`a[href="#${id}"]`)).toHaveCount(1);
    }
  });

  test('every bookmark rail link scrolls its target section into view', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    for (const id of SECTIONS) {
      await page.locator(`#bookmarkRail a[href="#${id}"]`).click();
      await expect(page.locator(`#${id}`)).toBeInViewport({ ratio: 0.1 });
    }
  });

  test('skip link moves focus to main content', async ({ page }) => {
    await page.goto('/');
    // The skip-link is intentionally positioned off-screen until it receives
    // keyboard focus (standard skip-link pattern), so a mouse click() fails
    // Playwright's in-viewport actionability check — use a real Tab press,
    // matching how a keyboard/screen-reader user actually reaches it.
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('project page back-link returns to the homepage projects section', async ({ page }) => {
    await page.goto('/projects/an-001-ball-and-beam-pid.html');
    const backLink = page.locator('.utility-bar a', { hasText: 'Application Circuits' });
    await expect(backLink).toHaveAttribute('href', '../index.html#sec-projects');
    await backLink.click();
    await expect(page).toHaveURL(/index\.html#sec-projects$/);
  });

  test('no broken internal links across the homepage and every project page', async ({ page, request }) => {
    const pages = [
      '/',
      '/projects/an-001-ball-and-beam-pid.html',
      '/projects/an-002-class-ab-amplifier.html',
      '/projects/an-003-communications-system.html',
      '/projects/an-004-sap-2-architecture.html',
      '/projects/an-005-network-storage.html',
    ];

    const checked = new Set<string>();
    for (const p of pages) {
      const hrefs = await collectInternalLinks(page, p);
      for (const href of hrefs) {
        const base = new URL(p, 'http://127.0.0.1:4173/').href;
        const resolved = new URL(href, base).href;
        if (checked.has(resolved)) continue;
        checked.add(resolved);
        const res = await request.get(resolved);
        expect(res.status(), `${href} linked from ${p} resolved to ${resolved}`).toBeLessThan(400);
      }
    }
    expect(checked.size).toBeGreaterThan(0);
  });
});
