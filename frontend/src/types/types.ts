
export type User={
    name: string;
    email: string;
    photo: string;
    gender: string;
    _id: string;
    dob: string;
    role: string;
}
 
export type Product = {
    name: string;
    price: number;
    stock: number;
    category: string;
    photo: string;
    _id: string;
}

export type shippingInfo = {
    address: string;
    pincode: string;
    state: string;
    city: string;
    country: string;
}

export type cartItems = {
    name: string;
    price: number;
    photo: string;
    productId: string;
    quantity: number;
    stock: number;
}

export type orderItem = {
    name: string;
    photo: string;
    price: number;
    quantity: number;
    productId: string;
    _id: string;
}

export type order = {
    shippingInfo: shippingInfo;
    user: {
        name: string;
        _id: string;
    };
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    orderItems: orderItem[];
    _id: string;
    status: string;
}