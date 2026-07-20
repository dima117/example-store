import { test, expect } from '@playwright/test';

test('если не удалось загрузить каталог, отображается сообщение об ошибке', async ({ page }) => {
    // перехватываем запрос браузера и отвечаем вместо сервера
    await page.route('**/api/products', (route) => route.fulfill({ status: 500 }));

    await page.goto('/catalog');

    await expect(page.getByTestId('error')).toBeVisible();
});

test('в каталоге отображаются название и цена товара', async ({ page }) => {
    // перехват умеет и подменять данные: состав каталога задаёт сам тест
    await page.route('**/api/products', (route) =>
        route.fulfill({
            json: [
                { id: 1, name: 'Тестовый товар', price: 100 },
                { id: 2, name: 'Другой товар', price: 200 },
            ],
        })
    );

    await page.goto('/catalog');

    await expect(page.getByTestId('product-list-item')).toHaveCount(2);

    const first = page.getByTestId('product-list-item').first();
    await expect(first.getByTestId('product-list-item-name')).toHaveText('Тестовый товар');
    await expect(first).toContainText('$100');
});
