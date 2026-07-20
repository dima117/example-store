import { test, expect } from '@playwright/test';

test('в каталоге отображаются товары', async ({ page }) => {
    await page.goto('/catalog');

    // костыль: подождать «с запасом», пока страница загрузится
    await page.waitForTimeout(2000);

    const count = await page.getByTestId('product-list-item').count();
    expect(count).toBe(42);
});
