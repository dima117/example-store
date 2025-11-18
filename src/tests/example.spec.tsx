import { beforeEach, expect, test } from 'vitest';
import { screen, within } from '@testing-library/react';
import { CheckoutForm } from '@/components/checkout-form';
import { debug } from 'vitest-preview';
import event from '@testing-library/user-event';
import { Cart } from '@/pages/cart';
import { createStubDeps, renderComponent } from './utils';

beforeEach(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
});

test('для оформления заказа нужно ввести ФИО, телефон, адрес, все поля обазательны для заполнения', async () => {
    const deps = createStubDeps();
    const { container, getByTestId } = renderComponent(<CheckoutForm onSubmit={() => {}} />, deps);

    // console.log(container.outerHTML);
    screen.logTestingPlaygroundURL(container);

    await event.click(getByTestId('button-submit'));

    expect(getByTestId('input-name').classList).toContain('is-invalid');
    expect(getByTestId('input-phone').classList).toContain('is-invalid');
    expect(getByTestId('input-address').classList).toContain('is-invalid');
});

test('должна отображаться таблица с добавленными в нее товарами', async () => {
    const deps = createStubDeps({
        11: { name: 'тест11', count: 10, price: 230 },
        22: { name: 'тест22', count: 20, price: 1000 },
    });

    const { getAllByTestId } = renderComponent(<Cart />, deps);

    const itemNames = getAllByTestId('cart-item-name').map((el) => el.textContent);

    expect(itemNames).toEqual(['тест11', 'тест22']);
});

test('для каждого товара в таблице должны отображаться название, цена, количество, стоимость', async () => {
    const deps = createStubDeps({
        11: { name: 'тест11', count: 10, price: 230 },
    });

    const { getAllByTestId } = renderComponent(<Cart />, deps);

    const row = within(getAllByTestId('cart-item')[0]);

    expect(row.getByTestId('cart-item-name').textContent).toBe('тест11');
    expect(row.getByTestId('cart-item-price').textContent).toBe('$230');
    expect(row.getByTestId('cart-item-count').textContent).toBe('10');
    expect(row.getByTestId('cart-item-total').textContent).toBe('$2300');
});

test('если корзина пуста, должна отображаться ссылка на каталог товаров', async () => {
    // теперь пустое состояние корзины задается явно в коде теста
    const deps = createStubDeps({});

    const { getByTestId } = renderComponent(<Cart />, deps);

    debug();

    expect(getByTestId('content').textContent).toBe('Cart is empty. Please select products in the catalog.');
    expect((getByTestId('link-catalog') as HTMLAnchorElement).href).toBe('http://localhost:3000/catalog');
});
