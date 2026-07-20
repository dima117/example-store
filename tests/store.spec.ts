import { test, expect } from '@playwright/test';

test('site works', async ({ page }) => {
    await page.goto('/catalog');

    await expect(page.getByTestId('product-list-item').first()).toBeVisible();
});
