import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router';
import { createMemoryHistory } from 'history';
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
        checkout: vi.fn<IServerApi['checkout']>(),
    } satisfies IServerApi;
}

/** рендер тестируемого блока со всеми внешними зависимостями приложения */
export function renderComponent(
    children: ReactNode,
    api: IServerApi = createStubApi(),
    cart: CartState = {},
    url: string = '/'
) {
    const store = initStore({ api }, cart);
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });

    // состояние роутера вынесено в memoryHistory: url — и ВХОД (initialEntries),
    // и доступный тесту ВЫХОД (history.location)
    const history = createMemoryHistory({ initialEntries: [url] });

    const result = render(
        // @ts-expect-error разница типов history и react-router
        // https://github.com/remix-run/react-router/issues/9422#issuecomment-1301182219
        <HistoryRouter history={history}>
            <Provider store={store}>
                <ApiProvider value={api}>
                    <QueryClientProvider client={client}>{children}</QueryClientProvider>
                </ApiProvider>
            </Provider>
        </HistoryRouter>
    );

    return { ...result, history };
}
