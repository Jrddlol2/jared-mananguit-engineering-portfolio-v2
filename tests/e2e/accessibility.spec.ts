import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage has no serious or critical automated a11y violations', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .exclude('.eng-bg') // decorative, aria-hidden background layer
      .analyze();

    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    if (serious.length) {
      console.log(JSON.stringify(serious.map((v) => ({ id: v.id, help: v.help, nodes: v.nodes.length })), null, 2));
    }
    expect(serious).toEqual([]);
  });

  test('a project page has no serious or critical automated a11y violations', async ({ page }) => {
    await page.goto('/projects/an-001-ball-and-beam-pid.html');
    const results = await new AxeBuilder({ page }).exclude('.eng-bg').analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious).toEqual([]);
  });

  test('every diagram figure has an accessible name', async ({ page }) => {
    await page.goto('/');
    // aria-hidden="true" svgs (e.g. certificate thumbnail icons) are
    // intentionally excluded from the accessibility tree and don't need one.
    const svgs = page.locator('svg[role="img"]:not([aria-hidden="true"])');
    const count = await svgs.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const svg = svgs.nth(i);
      const titleId = await svg.getAttribute('aria-labelledby');
      if (titleId) {
        await expect(page.locator(`#${titleId}`)).not.toHaveText('');
      } else {
        await expect(svg.locator('title')).not.toHaveText('');
      }
    }
  });

  test('heading hierarchy has exactly one h1 and no skipped levels on the homepage', async ({ page }) => {
    await page.goto('/');
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    const levels = await page.$$eval('h1, h2, h3, h4, h5, h6', (els) =>
      els.map((el) => Number(el.tagName[1]))
    );
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  test('skip link is keyboard-reachable as the very first focus stop', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
  });

  test('search trigger and theme toggle are reachable via keyboard tab order', async ({ page }) => {
    await page.goto('/');
    await page.locator('#searchTrigger').focus();
    await expect(page.locator('#searchTrigger')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#themeToggle')).toBeFocused();
  });
});
