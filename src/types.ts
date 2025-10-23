export interface Section {
  id: number;
  name: string;
  sortOrder: number;
}

export interface ProductShortInfo {
  id: number;
  name: string;
  price: number;
  section: number;
}

export interface Product extends ProductShortInfo {
  description: string;
  material: string;
  color: string;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
}

export interface CartItem {
  name: string;
  price: number;
  count: number;
}

export type CartState = Record<number, CartItem>;

export interface Order {
  form: CheckoutFormData;
  cart: CartState;
}

export interface CheckoutResponse {
  id: number;
}

export interface OrderItem {
  id: number;
  count: number;
  price: number;
  total: number;
}

export interface OrderData {
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

export interface CreateOrderRequest {
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

export interface CreateOrderResponse {
  orderId: number;
  totalAmount: number;
  createdAt: string;
}
