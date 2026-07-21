import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckoutForm } from '@components/checkout-form';

test('для оформления заказа нужно ввести ФИО, телефон, адрес — все поля обязательны', async () => {
    // тестируемый блок — ОДИН компонент: создаём его напрямую, вся система не нужна
    const { getByTestId } = render(<CheckoutForm onSubmit={() => {}} />);

    await userEvent.click(getByTestId('button-submit'));

    expect(getByTestId('input-name').classList).toContain('is-invalid');
    expect(getByTestId('input-phone').classList).toContain('is-invalid');
    expect(getByTestId('input-address').classList).toContain('is-invalid');
});
