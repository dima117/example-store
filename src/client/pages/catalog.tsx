import type { FC } from 'react';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import type { ProductShortInfo } from '@common/types';
import { ProductItem } from '@components/product-item';
import { PageTitle } from '@/components/page-title';
import { DocumentTitle } from '@/components/document-title';

/** страница каталога со списком товаров */
export const Catalog: FC = () => {
    const { data } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            return (await axios.get<ProductShortInfo[]>('/api/products')).data;
        },
    });

    const content = data ? (
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
