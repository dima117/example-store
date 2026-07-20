import { test, expect } from '@playwright/test';

test('в каталоге отображаются товары', async ({ page }) => {
    await page.goto('/catalog');

    // прямое чтение состояния страницы: count() возвращает число «прямо сейчас»
    const count = await page.getByTestId('product-list-item').count();
    expect(count).toBe(42);
});
