import mongoose from "mongoose"
import { InvalidateCacheProps } from "../types/Types.js";
import { nodeCache } from "../app.js";
import { Product } from "../schema/Product.js";


export const connectDB = ()=> {
    mongoose.connect("mongodb://0.0.0.0:27017",{
        dbName: "Ecommerce",
    }).then(connect => console.log(`DataBase Connected to ${connect.connection.host}`)).catch(e=> console.log(e));
};

export const invalidatesCache = async ({product} : InvalidateCacheProps) => {
    if(product)
    {
        const productKeys: string[] = ["latest-product","categories","admin-products"];

        const products = await Product.find({}).select("_id");

        products.forEach(element => {
            productKeys.push(`product-${element._id}`);
        });

        nodeCache.del(productKeys)
    }
};