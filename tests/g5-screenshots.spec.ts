import { test, expect } from '@playwright/test';

test('каталог выглядит как раньше', async ({ page }) => {
    await page.goto('/catalog');
    await expect(page.getByTestId('loading')).toBeHidden();

    // попиксельное сравнение с эталоном; при первом прогоне эталон создаётся
    await expect(page).toHaveScreenshot('catalog.png');
});
