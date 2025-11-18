import { ApiProvider } from '@/api';
import { initStore, type Deps } from '@/store';
import type { CartState } from '@/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { vi } from 'vitest';

export const createStubDeps = (state: CartState = {}): Deps => {
    return {
        cart: {
            getCartFromLocalStorage: vi.fn().mockReturnValue(state),
            saveCartToLocalStorage: vi.fn(),
        },
        api: {
            checkout: vi.fn(),
            getProductList: vi.fn().mockResolvedValue([]),
        },
    };
};

export const renderComponent = (children: ReactNode, deps: Deps) => {
    const store = initStore(deps);
    const client = new QueryClient();

    const result = render(
        <BrowserRouter>
            <Provider store={store}>
                <ApiProvider value={deps.api}>
                    <QueryClientProvider client={client}>{children}</QueryClientProvider>
                </ApiProvider>
            </Provider>
        </BrowserRouter>
    );

    return result;
};
