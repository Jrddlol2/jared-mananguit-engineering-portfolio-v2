import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads with the correct title and no console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/Jared Asher Mananguit/);
    expect(consoleErrors).toEqual([]);
  });

  test('hero renders name, standfirst, byline, and actions', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.masthead__name')).toContainText('Jared Asher');
    await expect(page.locator('.masthead__name')).toContainText('Mananguit');
    await expect(page.locator('.masthead__standfirst')).toContainText('single-board engineer');
    await expect(page.locator('.masthead__byline')).toContainText('Manila, Philippines');
    await expect(page.locator('.masthead__actions a', { hasText: 'View résumé' })).toHaveAttribute('href', 'Jared_Mananguit_Resume.pdf');
    await expect(page.locator('.masthead__actions a', { hasText: 'Get in touch' })).toHaveAttribute('href', /^mailto:/);
  });

  test('all six document sections are present', async ({ page }) => {
    await page.goto('/');
    const sections = [
      ['sec-introduction', 'Introduction'],
      ['sec-features', 'Core Competencies'],
      ['sec-characteristics', 'Technical Competencies'],
      ['sec-projects', 'Engineering Projects'],
      ['sec-experience', 'Experience & Involvement'],
      ['sec-certifications', 'Certifications'],
    ] as const;

    for (const [id, heading] of sections) {
      const section = page.locator(`#${id}`);
      await expect(section).toBeAttached();
      await expect(section.locator('h2')).toContainText(heading);
    }
  });

  test('page loads within a reasonable time (performance smoke test)', async ({ page }) => {
    const start = Date.now();
    await page.goto('/', { waitUntil: 'load' });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(5000);
  });
});
