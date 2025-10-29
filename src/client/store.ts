import {
  configureStore,
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CartState, CheckoutFormData, LastOrder } from "@/types";
import type { ProductShortInfo, CheckoutRequest, CheckoutResponse } from "@common/types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const emptyCart: CartState = {};

interface State {
  cart: CartState;
  lastOrder: LastOrder | null;
}

const initialState: State = {
  cart: emptyCart,
  lastOrder: null
};

const slice = createSlice({
  name: "example",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductShortInfo>) => {
      const { id, name, price } = action.payload;

      if (!state.cart[id]) {
        state.cart[id] = { name, count: 0, price };
      }

      state.cart[id].count++;
      state.lastOrder = null;
    },
    clearCart: (state) => {
      state.cart = emptyCart;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(checkout.fulfilled, (state, action) => {
      state.cart = {};
      state.lastOrder = action.payload;
    });
  },
});

export const initStore = () => {
  const store = configureStore({
    reducer: slice.reducer,
    devTools: true,
  });

  return store;
};

export interface CheckoutActionPayload {
  form: CheckoutFormData;
  cart: CartState;
}

export const checkout = createAsyncThunk<
  CheckoutResponse,
  CheckoutActionPayload
>(
  "example/checkout",
  async ({ form, cart }: CheckoutActionPayload) => {
    const items = Object.entries(cart).map(([id, item]) => ({
      id: Number(id),
      count: item.count
    }));
    
    const checkoutData: CheckoutRequest = {
      items,
      customer: {
        name: form.name,
        phone: form.phone,
        address: form.address
      }
    };
    
    const response = await axios.post<CheckoutResponse>("/api/checkout", checkoutData);
    return response.data;
  }
);

export const { addToCart, clearCart } = slice.actions;

export type Store = ReturnType<typeof initStore>;

export type RootState = ReturnType<Store["getState"]>;

export type AppDispatch = Store["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
