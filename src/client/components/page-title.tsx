import type { FC, PropsWithChildren } from 'react';

/** заголовок страницы */
export const PageTitle: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="row">
            <div className="col pt-4 pb-2">
                <h1 data-testid="page-title">{children}</h1>
            </div>
        </div>
    );
};
