import type { CheckoutRequest, CheckoutResponse, ProductShortInfo } from '@common/types';
import type { CartState } from './types';
import axios from 'axios';
import { createContext, useContext } from 'react';

/** ключ, в котором хранится состояние корзины в localStorage */
export const LOCAL_STORAGE_CART_KEY = 'example-store-cart';

/** состояние корзины по умолчанию */
export const EMPTY_CART: CartState = {};

export interface ICartApi {
    saveCartToLocalStorage(cart: CartState): void;
    getCartFromLocalStorage(): CartState;
}

// раньше продуктовый код использовал статические (глобальные) функции
// теперь функции находятся внутри объекта,
// если передать другой объект, можно подменить реализацию функций
export class CartApi implements ICartApi {
    /** сохранение состояния корзины в LocalStorage */
    saveCartToLocalStorage(cart: CartState): void {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    }

    /** получение состояния корзины из LocalStorage */
    getCartFromLocalStorage(): CartState {
        try {
            const json = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
            return json ? (JSON.parse(json) as CartState) : EMPTY_CART;
        } catch {
            return EMPTY_CART;
        }
    }
}

export interface IServerApi {
    checkout(params: CheckoutRequest): Promise<CheckoutResponse>;
    getProductList(): Promise<ProductShortInfo[]>;
}

export class ServerApi implements IServerApi {
    async checkout(params: CheckoutRequest) {
        const response = await axios.post<CheckoutResponse>('/api/checkout', params);
        return response.data;
    }
    async getProductList() {
        const response = await axios.get<ProductShortInfo[]>('/api/products');

        return response.data;
    }
}

const ApiContext = createContext<IServerApi | null>(null);

export const ApiProvider = ApiContext.Provider;

export const useApi = () => {
    const api = useContext(ApiContext);

    if (api === null) {
        throw new Error('API is not defined');
    }

    return api;
};