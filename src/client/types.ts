/** элемент корзины */
export interface CartItem {
    name: string;
    price: number;
    count: number;
}

/** состояние корзины с индексом по id товара */
export type CartState = Record<number, CartItem>;

/** контакты клиента */
export interface CheckoutFormData {
    name: string;
    phone: string;
    address: string;
}

/** необходимая информация для оформления заказа */
export interface Order {
    form: CheckoutFormData;
    cart: CartState;
}

/** информация об оформленном заказе */
export interface LastOrder {
    id: number;
    totalAmount: number;
    createdAt: string;
}
