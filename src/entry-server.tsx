import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { renderToString } from 'react-dom/server';

import { Application } from '@/application';
import { initStore, type Deps } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartApi } from '@/api';

export function render(url: string) {
    const deps: Deps = {
        cart: new CartApi(),
    };

    // при создании стора передаем в него зависимости
    const store = initStore(deps);
    const client = new QueryClient();

    const html = renderToString(
        <StrictMode>
            <MemoryRouter initialEntries={[url]}>
                <Provider store={store}>
                    <QueryClientProvider client={client}>
                        <Application />
                    </QueryClientProvider>
                </Provider>
            </MemoryRouter>
        </StrictMode>
    );

    return { html };
}
