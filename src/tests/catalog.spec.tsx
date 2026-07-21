import { expect, test } from 'vitest';
import { waitForElementToBeRemoved } from '@testing-library/react';

import { Catalog } from '@/pages/catalog';
import { createStubApi, renderComponent } from './utils';

test('в каталоге должны отображаться товары, список которых приходит с сервера', async () => {
    // вход блока задаём прямо из теста: сервер не нужен
    const api = createStubApi();
    api.getProductList.mockResolvedValue([
        { id: 1, name: 'Товар один', price: 100, description: '-', fullDescription: '-' },
        { id: 2, name: 'Товар два', price: 200, description: '-', fullDescription: '-' },
        { id: 3, name: 'Товар три', price: 300, description: '-', fullDescription: '-' },
    ]);

    const { getByTestId, getAllByTestId } = renderComponent(<Catalog />, api);

    await waitForElementToBeRemoved(getByTestId('loading'));

    const names = getAllByTestId('product-list-item-name').map((el) => el.textContent);
    expect(names).toEqual(['Товар один', 'Товар два', 'Товар три']);
});
