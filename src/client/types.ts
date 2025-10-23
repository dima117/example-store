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
