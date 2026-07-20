import { test, expect } from '@playwright/test';

test('если не удалось загрузить каталог, отображается сообщение об ошибке', async ({ page }) => {
    // перехватываем запрос браузера и отвечаем вместо сервера
    await page.route('**/api/products', (route) => route.fulfill({ status: 500 }));

    await page.goto('/catalog');

    await expect(page.getByTestId('error')).toBeVisible();
});
