import type { RequestHandler } from 'express';

/** искусственная задержка ответов API, мс (демо «ожидания») */
const DELAY_MS = 1000;

/** окно успешных ответов нестабильной ручки, мс (демо «ретраи») */
const FLAKY_OK_WINDOW_MS = 10_000;

/** до этого момента времени нестабильная ручка отвечает успешно */
let flakyOkUntil = 0;

/**
 * Демо-режимы сервера для лекции. Действуют ТОЛЬКО на запросы автотестов
 * (помечены заголовком x-autotest) — при ручном заходе сайт работает как обычно.
 *
 * Включаются переменными окружения при запуске сервера:
 * - DEMO_DELAY=1 — все ответы API отдаются с задержкой (грабля «ожидания»);
 * - DEMO_FLAKY=1 — ручка товара отвечает ошибкой 500, затем 10 секунд работает,
 *   затем снова ошибка (грабля «ретраи»).
 */
export const demoModesMiddleware: RequestHandler = (req, res, next) => {
    if (!req.headers['x-autotest']) {
        next();
        return;
    }

    if (process.env.DEMO_FLAKY && /^\/products\/\d+$/.test(req.path)) {
        if (Date.now() > flakyOkUntil) {
            flakyOkUntil = Date.now() + FLAKY_OK_WINDOW_MS;
            res.status(500).json({ message: 'Внутренняя ошибка сервера (демо-режим)' });
            return;
        }
    }

    if (process.env.DEMO_DELAY) {
        setTimeout(next, DELAY_MS);
        return;
    }

    next();
};
