import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { Application } from './client/application';
import { BrowserRouter } from 'react-router';
import { initStore } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = document.getElementById('root');

if (!root) {
    throw new Error('root element was not found');
}

const store = initStore();
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
