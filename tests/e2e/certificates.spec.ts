import { test, expect } from '@playwright/test';

test.describe('Certificates & résumé', () => {
  test('certifications section lists both CCNA certificates with working links', async ({ page, request }) => {
    await page.goto('/');
    const section = page.locator('#sec-certifications');
    await section.scrollIntoViewIfNeeded();

    // .cert-entry also wraps the résumé card in this section (same curated-publication
    // treatment) — filter to the two entries that are actually certificates.
    const entries = section.locator('.cert-entry').filter({ hasText: 'View Certificate' });
    await expect(entries).toHaveCount(2);

    const links = section.locator('a.read-more', { hasText: 'View Certificate' });
    await expect(links).toHaveCount(2);

    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      const res = await request.get(new URL(href!, 'http://127.0.0.1:4173/').href);
      expect(res.status(), `certificate PDF ${href} should be reachable`).toBe(200);
      expect(res.headers()['content-type']).toContain('pdf');
    }
  });

  test('résumé link opens the real PDF in a new tab', async ({ page, request }) => {
    await page.goto('/');
    const resumeLink = page.locator('.masthead__actions a', { hasText: 'View résumé' });
    await expect(resumeLink).toHaveAttribute('target', '_blank');
    await expect(resumeLink).toHaveAttribute('rel', /noopener/);

    const href = await resumeLink.getAttribute('href');
    const res = await request.get(new URL(href!, 'http://127.0.0.1:4173/').href);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('pdf');
  });
});
