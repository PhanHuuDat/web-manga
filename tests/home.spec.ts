import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Manga/);
});

test('home page has discover heading', async ({ page }) => {
  await page.goto('/');

  // Expects page to have a heading with the name of Discover Your Next Manga.
  await expect(
    page.getByRole('heading', { name: 'Discover Your Next Manga' }),
  ).toBeVisible();
});
