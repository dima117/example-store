import { initStore } from '@/store';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

export const renderComponent = (children: ReactNode) => {
    const store = initStore();

    const result = render(
        <BrowserRouter>
            <Provider store={store}>{children}</Provider>
        </BrowserRouter>
    );

    return result;
};
