import { test, expect } from '@playwright/test';

test('на странице товара отображаются его название и цена', async ({ page }) => {
    await page.goto('/catalog/13');

    await expect(page.getByTestId('loading')).toBeHidden();

    await expect(page.getByTestId('page-title')).toHaveText('Licensed Tuna');
    await expect(page.getByTestId('product-price')).toHaveText('$518');
});
