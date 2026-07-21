import type { FC } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ProductItem } from '@components/product-item';
import { PageTitle } from '@/components/page-title';
import { DocumentTitle } from '@/components/document-title';
import { useApi } from '@/api';

/** страница каталога со списком товаров */
export const Catalog: FC = () => {
    // вместо обращения к глобальному axios — api из точки расширения
    const api = useApi();

    const { data, error } = useQuery({
        queryKey: ['products'],
        queryFn: () => api.getProductList(),
    });

    const content = error ? (
        <div className="alert alert-danger" role="alert" data-testid="error">
            Failed to load products. Please try again later.
        </div>
    ) : data ? (
        data.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <ProductItem product={p} />
            </div>
        ))
    ) : (
        <div data-testid="loading">Loading...</div>
    );

    return (
        <>
            <DocumentTitle text="Catalog" />
            <PageTitle>Catalog</PageTitle>
            <div className="row">{content}</div>
        </>
    );
};
