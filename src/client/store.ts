import {
    configureStore,
    createSlice,
    createAsyncThunk,
    type PayloadAction,
    createListenerMiddleware,
    isAnyOf,
} from '@reduxjs/toolkit';
import type { CartState, CheckoutFormData, LastOrder } from '@/types';
import type { ProductShortInfo, CheckoutRequest, CheckoutResponse } from '@common/types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { EMPTY_CART, type ICartApi } from './api';

export interface Deps {
    cart: ICartApi;
}

// store typings
export type Store = ReturnType<typeof initStore>;
export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];

/** типизированный useDispatch */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/** типизированный useSelector */
export const useAppSelector = useSelector.withTypes<RootState>();

/** типизированный createAsyncThunk */
const createAppThunk = createAsyncThunk.withTypes<{
    state: RootState;
    extra: Deps;
}>();

// state
interface State {
    cart: CartState;
    lastOrder: LastOrder | null;
}

const INITIAL_STATE: State = {
    cart: EMPTY_CART,
    lastOrder: null,
};

// reducers
const slice = createSlice({
    name: 'example',
    initialState: INITIAL_STATE,
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
            state.cart = EMPTY_CART;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkout.fulfilled, (state, action) => {
            state.cart = {};
            state.lastOrder = action.payload;
        });
    },
});

/** redux action: добавление товара в корзину */
export const addToCart = slice.actions.addToCart;

/** redux action: очистка корзины */
export const clearCart = slice.actions.clearCart;

interface CheckoutActionPayload {
    form: CheckoutFormData;
    cart: CartState;
}

/** redux action: оформление заказа  */
export const checkout = createAppThunk<CheckoutResponse, CheckoutActionPayload>(
    'example/checkout',
    async ({ form, cart }: CheckoutActionPayload) => {
        const items = Object.entries(cart).map(([id, item]) => ({
            id: Number(id),
            count: item.count,
        }));

        const checkoutData: CheckoutRequest = {
            items,
            customer: {
                name: form.name,
                phone: form.phone,
                address: form.address,
            },
        };

        const response = await axios.post<CheckoutResponse>('/api/checkout', checkoutData);
        return response.data;
    }
);

// этот thunk выполняет сохранение состояния корзины в localStorage
export const saveCart = createAppThunk('example/save-cart', async (_, { getState, extra }) => {
    const cartState = getState().cart;
    extra.cart.saveCartToLocalStorage(cartState);
});

// подключаем listenerMiddleware, чтобы автоматически
// вызывать saveCart при изменении состояния корзины
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening.withTypes<RootState, AppDispatch, Deps>()({
    matcher: isAnyOf(addToCart, clearCart, checkout.fulfilled),
    effect: (_, { dispatch }) => {
        dispatch(saveCart());
    },
});

/** создать экземпляр redux store */
export const initStore = (deps: Deps) => {
    const store = configureStore({
        reducer: slice.reducer,
        preloadedState: {
            cart: deps.cart.getCartFromLocalStorage(),
            lastOrder: null,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                // передаем полученный из родителя объект deps
                // как дополнительный аргмент для всех thunk
                thunk: { extraArgument: deps },
            }).prepend(
                // подключаем listenerMiddleware к стору redux
                listenerMiddleware.middleware
            ),
        devTools: true,
    });

    return store;
};
