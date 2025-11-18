import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CheckoutForm } from '@/components/checkout-form';
import { debug } from 'vitest-preview';
import event from '@testing-library/user-event';

test('для оформления заказа нужно ввести ФИО, телефон, адрес, все поля обазательны для заполнения', async () => {
    const { container, getByTestId } = render(<CheckoutForm onSubmit={() => {}} />);

    // console.log(container.outerHTML);
    screen.logTestingPlaygroundURL(container);

    await event.click(getByTestId('button-submit'));

    expect(getByTestId('input-name').classList).toContain('is-invalid');
    expect(getByTestId('input-phone').classList).toContain('is-invalid');
    expect(getByTestId('input-address').classList).toContain('is-invalid');

    debug();
});
