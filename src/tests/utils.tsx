import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

import { ApiProvider, type IServerApi } from '@/api';
import { initStore } from '@/store';
import type { CartState } from '@/types';

/** заглушка серверного api: каждый тест задаёт нужные ему ответы */
export function createStubApi() {
    return {
        getProductList: vi.fn<IServerApi['getProductList']>().mockResolvedValue([]),
        getProductDetails: vi.fn<IServerApi['getProductDetails']>(),
    } satisfies IServerApi;
}

/** рендер тестируемого блока со всеми внешними зависимостями приложения */
export function renderComponent(children: ReactNode, api: IServerApi = createStubApi(), cart: CartState = {}) {
    const store = initStore(cart);
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

    return render(
        <BrowserRouter>
            <Provider store={store}>
                <ApiProvider value={api}>
                    <QueryClientProvider client={client}>{children}</QueryClientProvider>
                </ApiProvider>
            </Provider>
        </BrowserRouter>
    );
}
