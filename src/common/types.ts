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
