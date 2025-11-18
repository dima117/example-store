import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { useParams } from 'react-router';

import { ProductDetails } from '@components/product-details';
import { PageTitle } from '@/components/page-title';
import { DocumentTitle } from '@/components/document-title';
import { useApi } from '@/api';

/** страница отдельного товара */
export const Product: FC = () => {
    let { id } = useParams();
    const api = useApi();

    const { data } = useQuery({
        queryKey: ['details', id],
        queryFn: async () => api.getProductDetails(id),
    });

    if (!data) {
        return <div data-testid="loading">Loading...</div>;
    }

    return (
        <>
            <DocumentTitle text={data.name} />
            <PageTitle>{data.name}</PageTitle>
            <ProductDetails product={data} />
        </>
    );
};
