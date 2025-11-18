import { initStore, type Deps } from '@/store';
import type { CartState } from '@/types';
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
    };
};

export const renderComponent = (children: ReactNode, deps: Deps) => {
    const store = initStore(deps);

    const result = render(
        <BrowserRouter>
            <Provider store={store}>{children}</Provider>
        </BrowserRouter>
    );

    return result;
};
