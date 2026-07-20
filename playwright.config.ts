import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    // отчёт: список в терминале + html-отчёт (открываем вручную: npx playwright show-report)
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: 'http://localhost:5173',
        // помечаем запросы автотестов заголовком,
        // чтобы сервер включал демо-режимы только для тестов (руками сайт работает как обычно)
        extraHTTPHeaders: { 'x-autotest': '1' },
        // запись трейса при первом ретрае упавшего теста
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        // если сервер уже запущен вручную — используем его
        reuseExistingServer: true,
    },
});
