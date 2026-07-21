import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { renderToString } from 'react-dom/server';

import { Application } from '@/application';
import { initStore } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiProvider, ServerApi } from '@/api';

export function render(url: string) {
    const api = new ServerApi();
    const store = initStore({ api });
    const client = new QueryClient();

    const html = renderToString(
        <StrictMode>
            <MemoryRouter initialEntries={[url]}>
                <Provider store={store}>
                    <ApiProvider value={api}>
                        <QueryClientProvider client={client}>
                            <Application />
                        </QueryClientProvider>
                    </ApiProvider>
                </Provider>
            </MemoryRouter>
        </StrictMode>
    );

    return { html };
}
