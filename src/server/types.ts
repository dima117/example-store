/** позиция заказа */
export interface OrderItem {
    id: number;
    count: number;
    price: number;
    total: number;
}

/** оформленный заказ */
export interface Order {
    id: number;
    items: OrderItem[];
    customer: {
        name: string;
        phone: string;
        address: string;
    };
    totalAmount: number;
    createdAt: string;
}
