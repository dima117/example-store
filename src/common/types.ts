/** базовая информация о товаре */
export interface ProductShortInfo {
    id: number;
    name: string;
    price: number;
    description: string;
}

/** подробная информация о товаре */
export interface Product extends ProductShortInfo {
    fullDescription: string;
    material: string;
    color: string;
}

/** параметры запроса оформления заказа */
export interface CheckoutRequest {
    items: {
        id: number;
        count: number;
    }[];
    customer: {
        name: string;
        phone: string;
        address: string;
    };
}

/** формат ответа оформления заказа */
export interface CheckoutResponse {
    id: number;
    totalAmount: number;
    createdAt: string;
}
