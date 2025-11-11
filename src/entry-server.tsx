import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { renderToString } from 'react-dom/server';

import { Application } from '@/application';
import { initStore } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function render(url: string) {
    const store = initStore();
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
