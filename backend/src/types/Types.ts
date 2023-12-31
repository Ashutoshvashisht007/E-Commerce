import { NextFunction, Request, Response } from "express";

export interface newUserRequestBody {
    name: string;
    email: string;
    photo: string;
    gender: string;
    _id: string;
    dob: Date;
}

export interface newProductRequestBody {
    name: string;
    price: number;
    stock: number;
    category: string;
}

export type Controller = (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => Promise<void | Response<any, Record<string, any>>>  