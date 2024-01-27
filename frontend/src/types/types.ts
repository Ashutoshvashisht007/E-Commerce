
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