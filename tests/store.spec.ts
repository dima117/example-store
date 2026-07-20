import { test, expect } from '@playwright/test';

test('site works', async ({ page }) => {
    await page.goto('/catalog');

    await expect(page.getByTestId('product-list-item').first()).toBeVisible();
});

test('cart test', async ({ page }) => {
    await page.goto('/catalog');

    await page.getByTestId('button-add-to-cart').first().click();

    await expect(page.getByTestId('link-cart')).toHaveText('Cart (1)');
});
