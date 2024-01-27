import { User, cartItems, shippingInfo } from "./types";

export interface userReducerInitialState {
    user: User | null;
    loading: boolean;
}

export interface cartReducerInitialState {
    loading: boolean;
    cartItems: cartItems[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    shippingInfo: shippingInfo;
}