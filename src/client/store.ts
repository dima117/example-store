import { configureStore, createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState, CheckoutFormData, LastOrder } from '@/types';
import type { ProductShortInfo, CheckoutRequest, CheckoutResponse } from '@common/types';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_CART, saveCartToLocalStorage } from './utils';
import type { IServerApi } from '@/api';

/** внешние зависимости стора: доступны всем thunk через extra */
export interface Deps {
    api: IServerApi;
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

            // Сохраняем корзину в localStorage
            saveCartToLocalStorage(state.cart);
        },
        clearCart: (state) => {
            state.cart = EMPTY_CART;

            // Сохраняем пустую корзину в localStorage
            saveCartToLocalStorage(EMPTY_CART);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkout.fulfilled, (state, action) => {
            state.cart = {};
            state.lastOrder = action.payload;

            // Сохраняем пустую корзину в localStorage после успешного оформления заказа
            saveCartToLocalStorage(EMPTY_CART);
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
    async (action, { extra }) => {
        const { form, cart } = action;

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

        // зависимость приходит через extra — тот же api, что и у компонентов
        return await extra.api.checkout(checkoutData);
    }
);

/** создать экземпляр redux store */
export const initStore = (deps: Deps, cart: CartState = {}) => {
    const store = configureStore({
        reducer: slice.reducer,
        preloadedState: {
            cart,
            lastOrder: null,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                // передаём зависимости всем thunk как extra
                thunk: { extraArgument: deps },
            }),
        devTools: true,
    });

    return store;
};
