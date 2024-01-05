import { NextFunction, Request, Response } from "express";

export interface Params{
    id: string
}

export interface newUserRequestBody {
    name: string;
    email: string;
    photo: string;
    gender: string;
    _id: string;
    dob: Date;
}

export type Controller = (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => Promise<void | Response<any, Record<string, any>>>  