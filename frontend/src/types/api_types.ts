import { Product, User, cartItems, order, shippingInfo } from "./types";

export type customError = {
    status: number;
    data:{
        message: string;
        success: boolean;
    }
}

export type messageResponse = {
    message: string;
    success: boolean;
}

export type userResponse = {
    success: boolean;
    user: User;
}

export type allProductResponse = {
    success: boolean;
    products: Product[];
}

export type allCategoryResponse = {
    success: boolean;
    categories: string[];
}

export type searchProductResponse = {
    success: boolean;
    products: Product[];
    totalPage: number;
}

export type searchProductRequest = {
    search: string;
    sort: string;
    price: number;
    category: string;
    page: number;
}

export type updateProductRequest = {
    product_id: string;
    user_id: string;
    formData: FormData;
}

export type deleteProductRequest = {
    product_id: string;
    user_id: string;
}

export type newProductRequest = {
    id: string;
    formData: FormData;
}

export type prodcutDetailResponse = {
    success: boolean;
    product: Product;
}

export type newOrderRequest = {
    shippingInfo: shippingInfo;
    user: string;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    orderItems: cartItems[];
}

export type orderProductResponse = {
    success: boolean;
    orders: order[];
}
export type singleOrderResponse = {
    success: boolean;
    order: order;
}

export type processOrderRequest = {
    order_id: string;
    user_id: string;
}