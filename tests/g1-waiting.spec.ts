import { test, expect } from '@playwright/test';

test('в каталоге отображаются товары', async ({ page }) => {
    await page.goto('/catalog');

    // ждём событие, а не время: индикатор загрузки исчез — страница готова
    await expect(page.getByTestId('loading')).toBeHidden();

    // web-first assertion: сама дожидается нужного состояния
    await expect(page.getByTestId('product-list-item')).toHaveCount(42);
});
