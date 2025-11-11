import type { CartState } from '@/types';

/** форматирует дату в локализованную строку */
export function formatDate(date: Date): string {
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/** ключ, в котором хранится состояние корзины в localStorage */
export const LOCAL_STORAGE_CART_KEY = 'example-store-cart';

/** состояние корзины по умолчанию */
export const EMPTY_CART: CartState = {};

/** сохранение состояния корзины в LocalStorage */
export const saveCartToLocalStorage = (cart: CartState): void => {
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
};

/** получение состояния корзины из LocalStorage */
export const getCartFromLocalStorage = (): CartState => {
    try {
        const json = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
        return json ? (JSON.parse(json) as CartState) : EMPTY_CART;
    } catch {
        return EMPTY_CART;
    }
};
