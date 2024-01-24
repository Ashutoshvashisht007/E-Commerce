import { Product, User } from "./types";

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