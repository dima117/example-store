import { test, expect } from '@playwright/test';

test('каталог выглядит как раньше', async ({ page }) => {
    await page.goto('/catalog');
    await expect(page.getByTestId('loading')).toBeHidden();

    // попиксельное сравнение с эталоном; при первом прогоне эталон создаётся
    await expect(page).toHaveScreenshot('catalog.png');
});

test('страница подтверждения заказа выглядит как раньше', async ({ page }) => {
    // оформляем заказ
    await page.goto('/catalog');
    await page.getByTestId('button-add-to-cart').first().click();
    await page.getByTestId('link-cart').click();
    await page.getByTestId('input-name').fill('Иван Иванов');
    await page.getByTestId('input-phone').fill('999 123 4567');
    await page.getByTestId('input-address').fill('Казань');
    await page.getByTestId('button-submit').click();
    await expect(page.getByTestId('order-info')).toBeVisible();

    // в кадре — блок подтверждения с датой и номером заказа
    await expect(page).toHaveScreenshot('order-confirmation.png');
});
