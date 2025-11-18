import type { CheckoutRequest, CheckoutResponse } from '@common/types';
import type { CartState } from './types';
import axios from 'axios';

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
}

export class ServerApi implements IServerApi {
    async checkout(params: CheckoutRequest) {
        const response = await axios.post<CheckoutResponse>('/api/checkout', params);
        return response.data;
    }
}
