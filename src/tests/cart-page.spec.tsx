import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { Cart } from '@/pages/cart';
import { initStore } from '@/store';

test('если корзина пуста, должна отображаться ссылка на каталог товаров', () => {
    // тестируемый блок может быть и КРУПНЫМ — целая страница приложения.
    // у страницы есть внешние зависимости: стор и роутер — передаём их провайдерами
    const store = initStore();

    const { getByTestId } = render(
        <BrowserRouter>
            <Provider store={store}>
                <Cart />
            </Provider>
        </BrowserRouter>
    );

    expect(getByTestId('content').textContent).toBe('Cart is empty. Please select products in the catalog.');
    expect((getByTestId('link-catalog') as HTMLAnchorElement).href).toContain('/catalog');
});
