import { expect, test } from 'vitest';
import { screen, within } from '@testing-library/react';
import { CheckoutForm } from '@/components/checkout-form';
import { debug } from 'vitest-preview';
import event from '@testing-library/user-event';
import { Cart } from '@/pages/cart';
import { renderComponent } from './utils';
import type { CartState } from '@/types';
import { LOCAL_STORAGE_CART_KEY } from '@/utils';

test('для оформления заказа нужно ввести ФИО, телефон, адрес, все поля обазательны для заполнения', async () => {
    const { container, getByTestId } = renderComponent(<CheckoutForm onSubmit={() => {}} />);

    // console.log(container.outerHTML);
    screen.logTestingPlaygroundURL(container);

    await event.click(getByTestId('button-submit'));

    expect(getByTestId('input-name').classList).toContain('is-invalid');
    expect(getByTestId('input-phone').classList).toContain('is-invalid');
    expect(getByTestId('input-address').classList).toContain('is-invalid');
});

test('если корзина пуста, должна отображаться ссылка на каталог товаров', async () => {
    const { getByTestId } = renderComponent(<Cart />);

    expect(getByTestId('content').textContent).toBe('Cart is empty. Please select products in the catalog.');
    expect((getByTestId('link-catalog') as HTMLAnchorElement).href).toBe('http://localhost:3000/catalog');
});

test('должна отображаться таблица с добавленными в нее товарами', async () => {
    const cart: CartState = {
        11: { name: 'тест11', count: 10, price: 230 },
        22: { name: 'тест22', count: 20, price: 1000 },
    };

    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));

    const { getAllByTestId } = renderComponent(<Cart />);

    const itemNames = getAllByTestId('cart-item-name').map((el) => el.textContent);

    expect(itemNames).toEqual(['тест11', 'тест22']);
});

test.only('для каждого товара в таблице должны отображаться название, цена, количество, стоимость', async () => {
    const cart: CartState = {
        11: { name: 'тест11', count: 10, price: 230 },
    };

    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));

    const { getAllByTestId } = renderComponent(<Cart />);

    const row = within(getAllByTestId('cart-item')[0]);

    expect(row.getByTestId('cart-item-name').textContent).toBe('тест11');
    expect(row.getByTestId('cart-item-price').textContent).toBe('$230');
    expect(row.getByTestId('cart-item-count').textContent).toBe('10');
    expect(row.getByTestId('cart-item-total').textContent).toBe('$2300');

    debug();
});
