import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { Application } from './client/application';
import { BrowserRouter } from 'react-router';
import { initStore, type Deps } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartApi } from '@/api';

const root = document.getElementById('root');

if (!root) {
    throw new Error('root element was not found');
}

const deps: Deps = {
    cart: new CartApi(),
};

// при создании стора передаем в него зависимости
const store = initStore(deps);
const client = new QueryClient();

hydrateRoot(
    root,
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <QueryClientProvider client={client}>
                    <Application />
                </QueryClientProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
