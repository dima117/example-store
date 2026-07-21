import { expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';

import { Cart } from '@/pages/cart';
import type { CartState } from '@/types';
import { createStubApi, renderComponent } from './utils';

test('при нажатии кнопки «Заказать» содержимое корзины и значения полей формы отправляются на сервер', async () => {
    const api = createStubApi();
    api.checkout.mockResolvedValue({ id: 1, totalAmount: 22300, createdAt: '2026-01-01T12:00:00.000Z' });

    // состояние корзины задаём напрямую через preloadedState — коротко и явно
    const cart: CartState = {
        11: { name: 'тест11', count: 10, price: 230 },
        22: { name: 'тест22', count: 20, price: 1000 },
    };

    const { getByTestId } = renderComponent(<Cart />, api, cart);

    await userEvent.type(getByTestId('input-name'), 'Иван Иванов');
    await userEvent.type(getByTestId('input-phone'), '999 123 4567');
    await userEvent.type(getByTestId('input-address'), 'Казань');
    await userEvent.click(getByTestId('button-submit'));

    // проверяем, что именно ушло на сервер
    expect(api.checkout).toBeCalledWith({
        items: [
            { id: 11, count: 10 },
            { id: 22, count: 20 },
        ],
        customer: {
            name: 'Иван Иванов',
            phone: '999 123 4567',
            address: 'Казань',
        },
    });
});
