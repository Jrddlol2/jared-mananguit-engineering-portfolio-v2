import { test, expect } from '@playwright/test';

const PROJECTS = [
  { path: '/projects/an-001-ball-and-beam-pid.html', code: 'AN-001', title: 'Ball-and-Beam PID Control System' },
  { path: '/projects/an-002-class-ab-amplifier.html', code: 'AN-002', title: 'Class AB Audio Power Amplifier' },
  { path: '/projects/an-003-communications-system.html', code: 'AN-003', title: 'Communications System' },
  { path: '/projects/an-004-sap-2-architecture.html', code: 'AN-004', title: 'SAP-2 Architecture' },
  { path: '/projects/an-005-network-storage.html', code: 'AN-005', title: 'Self-Hosted Network Storage Platform' },
];

test.describe('Project detail pages', () => {
  for (const project of PROJECTS) {
    test(`${project.code} loads, titles correctly, and renders its diagram with no console errors`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
      page.on('pageerror', (err) => consoleErrors.push(err.message));

      const response = await page.goto(project.path);
      expect(response?.status()).toBeLessThan(400);
      await expect(page).toHaveTitle(new RegExp(project.code));
      // The <h1> wraps its title across a <br>, which drops the space from
      // textContent — match words individually rather than the exact phrase.
      const headingText = await page.locator('h1, h2').first().textContent();
      for (const word of project.title.split(' ')) {
        expect(headingText).toContain(word);
      }

      // Every project page ships at least one inline SVG diagram with an
      // accessible <title> — a real, distinctive feature of this site.
      const svg = page.locator('svg[role="img"]').first();
      await expect(svg).toBeVisible();
      await expect(svg.locator('title')).not.toHaveText('');

      expect(consoleErrors).toEqual([]);
    });

    test(`${project.code} has working theme and print controls`, async ({ page }) => {
      await page.goto(project.path);
      await expect(page.locator('#themeToggle')).toBeVisible();
      await expect(page.locator('#printTrigger')).toBeVisible();
    });
  }
});
