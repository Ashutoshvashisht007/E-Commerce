import { Request } from "express";
import { TryCatchBlockWrapper } from "../middlewares/Error.js";
import { newProductRequestBody } from "../types/Types.js";
import { Product } from "../schema/Product.js";

export const newProduct = TryCatchBlockWrapper(
    async(
        req:Request<{},{},newProductRequestBody> ,
        res,
        next)=>{
        
            const {name, price, stock, category} = req.body;
            const photo = req.file;

            await Product.create({
                name,
                photo: photo?.path,
                price,
                stock,
                category: category.toLowerCase,
            });

            return res.status(201).json({
                success: "true",
                message: "Product created successfully"
            })
    }
)