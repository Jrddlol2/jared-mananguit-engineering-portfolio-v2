import { test, expect } from '@playwright/test';

test.describe('Theme (dark / "night reading" mode)', () => {
  test('respects the OS color-scheme preference on first visit', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await context.close();
  });

  test('toggle switches theme and updates the visible label', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('#themeToggle');
    const startingTheme = await page.locator('html').getAttribute('data-theme');

    await toggle.click();
    const newTheme = await page.locator('html').getAttribute('data-theme');
    expect(newTheme).not.toBe(startingTheme);
    await expect(page.locator('#themeState')).toHaveText(newTheme === 'dark' ? 'On' : 'Off');
    await expect(toggle).toHaveAttribute('aria-pressed', String(newTheme === 'dark'));
  });

  test('explicit choice persists across reload via localStorage', async ({ page }) => {
    await page.goto('/');
    await page.locator('#themeToggle').click();
    const chosen = await page.locator('html').getAttribute('data-theme');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', chosen!);

    const stored = await page.evaluate(() => localStorage.getItem('theme'));
    expect(stored).toBe(chosen);
  });

  test('explicit choice persists when navigating to a project page', async ({ page }) => {
    await page.goto('/');
    await page.locator('#themeToggle').click();
    const chosen = await page.locator('html').getAttribute('data-theme');

    await page.goto('/projects/an-001-ball-and-beam-pid.html');
    await expect(page.locator('html')).toHaveAttribute('data-theme', chosen!);
  });
});
