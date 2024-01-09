import { Request } from "express";
import { TryCatchBlockWrapper } from "../middlewares/Error.js";
import { newProductRequestBody } from "../types/Types.js";
import { Product } from "../schema/Product.js";
import ErrorHandler from "../utils/Utility_Class.js";
import { rm } from "fs";

export const newProduct = TryCatchBlockWrapper(
    async(
        req:Request<{},{},newProductRequestBody> ,
        res,
        next)=>{
        
            const {name, price, stock, category} = req.body;
            const photo = req.file;

            if(!photo)
            {
                return next(new ErrorHandler("No photo Added",400));
            }

            if(!name || !price || !stock || !category)
            {

                rm(photo.path, ()=> {
                    // console.log("Deleted");
                }) 

                return next(new ErrorHandler("Please enter all fields",400));
            }

            await Product.create({
                name,
                photo: photo.path,
                price,
                stock,
                category: category.toLowerCase(),
            });

            return res.status(201).json({
                success: "true",
                message: "Product created successfully"
            })
    }
);

export const getLatestProducts = TryCatchBlockWrapper(
    async(
        req: Request<{},{}, newProductRequestBody>,
        res,
        next,
    ) =>{

        const products = await Product.find({}).sort({createdAt: -1}).limit(5);

        return res.status(201).json({
            succes: true,
            products
        })
    }
);

export const getAllCategories = TryCatchBlockWrapper(
    async(
        req,
        res,
        next,
    ) =>{

        const categories = await Product.distinct("category");

        return res.status(201).json({
            succes: true,
            categories
        })
    }
)

export const getAdminProducts = TryCatchBlockWrapper(
    async(
        req,
        res,
        next,
    ) =>{

        const products = await Product.find({});

        return res.status(201).json({
            succes: true,
            products
        })
    }
);

export const getSingleProduct = TryCatchBlockWrapper(
    async(
        req,
        res,
        next,
    ) =>{

        const product = await Product.findById(req.params.id);

        return res.status(201).json({
            succes: true,
            product
        })
    }
);

export const updateProduct = TryCatchBlockWrapper(
    async(
        req,
        res,
        next)=>{

            const {id} = req.params;
        
            const {name, price, stock, category} = req.body;
            const photo = req.file;

            const product = await Product.findById(id);

            if(!product)
            {
                next(new ErrorHandler("Invalid Product ID",400));
            }

            // if(photo)
            // {

            //     rm(product.photo!, ()=> {
            //         // console.log("Deleted");
            //     });

            //     product.photo = photo.path;
            // }

            // if(name)
            // {
            //     product.name = name;
            // }

            return res.status(201).json({
                success: "true",
                message: "Product created successfully"
            })
    }
);