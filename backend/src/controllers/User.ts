import { NextFunction, Request, Response } from "express";
import { User } from "../schema/User.js";
import { newUserRequestBody } from "../types/Types.js";


export const newUser = async (
    req: Request<{},{},newUserRequestBody>, 
    res: Response, 
    next: NextFunction
    ) => {
    try {
        return next("Mera Error");
        console.log("Hello")
        const { name, email, photo, gender, _id, dob } = req.body;

        await User.create(
            {
                name, 
                email, 
                photo, 
                gender, 
                _id, 
                dob: new Date(dob)
        })

        res.status(201).json({
            success: true,
            message: `Welcome, ${User.name}`,
        });
    } catch (error) {
        return res.status(400).json({
            succcess: false,
            message: error,
        })
    }
};