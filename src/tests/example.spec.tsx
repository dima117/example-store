import { beforeEach, expect, test, vi } from 'vitest';
import { screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import { CheckoutForm } from '@/components/checkout-form';
import { debug } from 'vitest-preview';
import event from '@testing-library/user-event';
import { Cart } from '@/pages/cart';
import { createStubDeps, renderComponent } from './utils';
import { Catalog } from '@/pages/catalog';
import { Application } from '@/application';

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

    expect(getByTestId('content').textContent).toBe('Cart is empty. Please select products in the catalog.');
    expect((getByTestId('link-catalog') as HTMLAnchorElement).href).toBe('http://localhost:3000/catalog');
});

test('при нажатии кнопки "Заказать" содержимое корзины и значения полей формы заказа отправляются на сервер и оформляется новый заказ', async () => {
    const deps = createStubDeps({
        11: { name: 'тест11', count: 10, price: 230 },
        22: { name: 'тест22', count: 20, price: 1000 },
    });

    const { getByTestId } = renderComponent(<Cart />, deps);

    await event.type(getByTestId('input-name'), 'Иван Иванов');
    await event.type(getByTestId('input-phone'), '+79991234567');
    await event.type(getByTestId('input-address'), 'Казань');

    await event.click(getByTestId('button-submit'));

    expect(deps.api.checkout).toBeCalledWith({
        customer: {
            address: 'Казань',
            name: 'Иван Иванов',
            phone: '+79991234567',
        },
        items: [
            { id: 11, count: 10 },
            { id: 22, count: 20 },
        ],
    });
});

test('в каталоге должны отображаться товары, список которых приходит с сервера', async () => {
    const deps = createStubDeps();

    deps.api.getProductList = vi.fn().mockResolvedValueOnce([
        { id: 1, name: 'Item 1', price: 111, description: 'Test product description 1' },
        { id: 2, name: 'Item 2', price: 222, description: 'Test product description 2' },
        { id: 3, name: 'Item 3', price: 333, description: 'Test product description 3' },
    ]);

    const { getByTestId, getAllByTestId } = renderComponent(<Catalog />, deps);

    await waitForElementToBeRemoved(getByTestId('loading'));

    const items = getAllByTestId('product-list-item');
    const names = items.map((item) => within(item).getByTestId('name').textContent);

    expect(names).toEqual(['Item 1', 'Item 2', 'Item 3']);
});

test.only('название является ссылкой на страницу c подробной информацией о товаре', async () => {
    const deps = createStubDeps();
    deps.api.getProductList = vi.fn()
        .mockResolvedValueOnce([{ id: 1, name: 'Item 1', price: 111, description: 'Test product description 3' }]);
    deps.api.getProductDetails = vi.fn()
        .mockResolvedValueOnce({ 
            id: 1,
            name: 'Item 1',
            price: 111,
            description: 'Test product description 1',
            fullDescription: 'Test product full description 1',
            material: 'Wood',
            color: 'Orange',
        });

    const { getByTestId, history } = renderComponent(<Application />, deps, '/catalog');

    await waitForElementToBeRemoved(getByTestId('loading'));
    
    const item = getByTestId('product-list-item');
    const itemName = within(item).getByTestId('name');
    
    await event.click(itemName);

    // console.log(window.location.pathname)

    expect(getByTestId('page-title').textContent).toBe('Item 1');
    expect(history.location.pathname).toBe('/catalog/1');
    
    debug();
});
