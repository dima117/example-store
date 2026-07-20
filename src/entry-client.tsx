import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { Application } from './client/application';
import { BrowserRouter } from 'react-router';
import { initStore } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getCartFromLocalStorage } from '@/utils';

const root = document.getElementById('root');

if (!root) {
    throw new Error('root element was not found');
}

const cart = getCartFromLocalStorage();
const store = initStore(cart);

// повторные попытки запросов отключены: молчаливые ретраи маскируют ошибки,
// а поведение приложения становится непредсказуемым по времени
const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
});

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
