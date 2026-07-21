import { expect, test } from 'vitest';
import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Application } from '@/application';
import { createStubApi, renderComponent } from './utils';

test('название товара является ссылкой на страницу с подробной информацией', async () => {
    const api = createStubApi();
    api.getProductList.mockResolvedValue([
        { id: 1, name: 'Товар один', price: 100, description: '-', fullDescription: '-' },
    ]);
    api.getProductDetails.mockResolvedValue({
        id: 1,
        name: 'Товар один',
        price: 100,
        description: '-',
        fullDescription: '-',
        material: 'дерево',
        color: 'красный',
    });

    // тестируемый блок — ВСЁ приложение; стартовый url задаём как вход
    const { getByTestId } = renderComponent(<Application />, api, {}, '/catalog');

    await waitForElementToBeRemoved(getByTestId('loading'));

    await userEvent.click(getByTestId('product-list-item-name'));

    await waitFor(() => expect(getByTestId('page-title').textContent).toBe('Товар один'));
});
