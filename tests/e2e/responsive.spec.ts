import { test, expect } from '@playwright/test';

test.describe('Responsive layout', () => {
  test('desktop (1280px): bookmark rail visible, mobile ToC hidden', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    await expect(page.locator('#bookmarkRail')).toBeVisible();
    await expect(page.locator('.toc-mobile')).toBeHidden();
  });

  test('tablet (768px): rail collapses, mobile ToC available', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('#bookmarkRail')).toBeHidden();
    await expect(page.locator('.toc-mobile')).toBeVisible();
  });

  test('mobile (375px): mobile ToC expands on click and hero has no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    await expect(page.locator('#bookmarkRail')).toBeHidden();
    const toc = page.locator('.toc-mobile');
    await expect(toc).toBeVisible();
    await expect(toc).not.toHaveJSProperty('open', true);
    await toc.locator('summary').click();
    await expect(toc).toHaveJSProperty('open', true);

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // +1 for sub-pixel rounding
  });

  test('hero name remains legible (does not overflow its container) from mobile to desktop', async ({ page }) => {
    for (const width of [375, 768, 1280, 1600]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const name = page.locator('.masthead__name');
      const box = await name.boundingBox();
      expect(box?.width, `at ${width}px viewport`).toBeLessThanOrEqual(width);
    }
  });
});
