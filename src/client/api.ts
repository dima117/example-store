import { createContext, useContext } from 'react';
import axios from 'axios';

import type { Product, ProductShortInfo } from '@common/types';

/** интерфейс серверного API приложения */
export interface IServerApi {
    getProductList(): Promise<ProductShortInfo[]>;
    getProductDetails(id: unknown): Promise<Product>;
}

/** реализация серверного API поверх axios */
export class ServerApi implements IServerApi {
    async getProductList() {
        const response = await axios.get<ProductShortInfo[]>('/api/products');
        return response.data;
    }

    async getProductDetails(id: unknown) {
        const response = await axios.get<Product>(`/api/products/${id}`);
        return response.data;
    }
}

const ApiContext = createContext<IServerApi | null>(null);

/** точка расширения: приложение получает реальный api в корне, тесты подставляют заглушку */
export const ApiProvider = ApiContext.Provider;

/** доступ к api из компонентов */
export function useApi(): IServerApi {
    const api = useContext(ApiContext);

    if (api === null) {
        throw new Error('API is not provided');
    }

    return api;
}
