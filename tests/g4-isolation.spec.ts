import { test, expect } from '@playwright/test';

test('после оформления заказа отображается номер созданного заказа', async ({ page }) => {
    // arrange: кладём товар в корзину и открываем оформление заказа
    await page.goto('/catalog');
    await page.getByTestId('button-add-to-cart').first().click();
    await page.getByTestId('link-cart').click();

    // act: заполняем форму и оформляем заказ
    await page.getByTestId('input-name').fill('Иван Иванов');
    await page.getByTestId('input-phone').fill('999 123 4567');
    await page.getByTestId('input-address').fill('Казань');
    await page.getByTestId('button-submit').click();

    // assert: на экране номер созданного заказа
    await expect(page.getByTestId('order-info')).toContainText('заказ №1');
});
