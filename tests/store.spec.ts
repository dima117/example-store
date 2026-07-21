import { test, expect } from '@playwright/test';

test('site works', async ({ page }) => {
    await page.goto('/catalog');

    await expect(page.getByTestId('product-list-item').first()).toBeVisible();
});

test('если открыт каталог, то при нажатии «Купить» товар добавляется в корзину', async ({ page }) => {
    // arrange: открываем каталог
    await page.goto('/catalog');

    // act: нажимаем «Купить» у первого товара
    await page.getByTestId('button-add-to-cart').first().click();

    // assert: счётчик корзины в шапке показывает один товар
    await expect(page.getByTestId('link-cart')).toHaveText('Cart (1)');
});
