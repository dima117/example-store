import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CheckoutForm } from '@/components/checkout-form';
import { debug } from 'vitest-preview';
import event from '@testing-library/user-event';
import { Cart } from '@/pages/cart';
import { initStore } from '@/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

test('для оформления заказа нужно ввести ФИО, телефон, адрес, все поля обазательны для заполнения', async () => {
    const { container, getByTestId } = render(<CheckoutForm onSubmit={() => {}} />);

    // console.log(container.outerHTML);
    screen.logTestingPlaygroundURL(container);

    await event.click(getByTestId('button-submit'));

    expect(getByTestId('input-name').classList).toContain('is-invalid');
    expect(getByTestId('input-phone').classList).toContain('is-invalid');
    expect(getByTestId('input-address').classList).toContain('is-invalid');
});

test.only('если корзина пуста, должна отображаться ссылка на каталог товаров', async () => {
    const store = initStore();

    const { getByTestId } = render(
        <BrowserRouter>
            <Provider store={store}>
                <Cart />
            </Provider>
        </BrowserRouter>
    );

    expect(getByTestId('content').textContent).toBe('Cart is empty. Please select products in the catalog.');
    expect((getByTestId('link-catalog') as HTMLAnchorElement).href).toBe('http://localhost:3000/catalog');

    debug();
});
