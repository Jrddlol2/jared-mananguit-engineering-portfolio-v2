import { test, expect } from '@playwright/test';

test.describe('Command palette search', () => {
  test('Ctrl+K opens the overlay and focuses the input', async ({ page }) => {
    await page.goto('/');
    const overlay = page.locator('#searchOverlay');
    await expect(overlay).toBeHidden();
    await page.keyboard.press('Control+k');
    await expect(overlay).toBeVisible();
    await expect(page.locator('#searchInput')).toBeFocused();
  });

  test('clicking the search trigger button also opens it', async ({ page }) => {
    await page.goto('/');
    await page.locator('#searchTrigger').click();
    await expect(page.locator('#searchOverlay')).toBeVisible();
  });

  test('typing filters results to a matching project', async ({ page }) => {
    await page.goto('/');
    await page.locator('#searchTrigger').click();
    // "AN-004" is unique to the project entry's title (a separate "Technology"
    // entry also mentions SAP-2, so a broader query would match both).
    await page.locator('#searchInput').fill('AN-004');
    const results = page.locator('#searchResults li a');
    await expect(results).toHaveCount(1);
    await expect(results.first()).toContainText('SAP-2');
  });

  test('typing a query with no matches shows the empty state', async ({ page }) => {
    await page.goto('/');
    await page.locator('#searchTrigger').click();
    await page.locator('#searchInput').fill('zzzznomatch');
    await expect(page.locator('.search-panel__empty')).toBeVisible();
  });

  test('pressing Enter navigates to the selected result', async ({ page }) => {
    await page.goto('/');
    await page.locator('#searchTrigger').click();
    await page.locator('#searchInput').fill('AN-004');
    await page.locator('#searchInput').press('Enter');
    await expect(page).toHaveURL(/an-004-sap-2-architecture\.html$/);
  });

  test('Escape closes the overlay and restores focus to the trigger', async ({ page }) => {
    await page.goto('/');
    await page.locator('#searchTrigger').click();
    await page.locator('#searchInput').press('Escape');
    await expect(page.locator('#searchOverlay')).toBeHidden();
    await expect(page.locator('#searchTrigger')).toBeFocused();
  });

  test('clicking the backdrop closes the overlay', async ({ page }) => {
    await page.goto('/');
    await page.locator('#searchTrigger').click();
    await page.locator('#searchOverlay').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('#searchOverlay')).toBeHidden();
  });
});
