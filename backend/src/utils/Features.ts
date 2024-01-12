import mongoose from "mongoose"
import { InvalidateCacheProps, OrderItemType } from "../types/Types.js";
import { nodeCache } from "../app.js";
import { Product } from "../schema/Product.js";


export const connectDB = (uri: string)=> {
    mongoose.connect(uri,{
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

export const reduceStock = async (orderItems: OrderItemType[]) => {
    for(let i=0;i<orderItems.length;i++)
    {
        const order = orderItems[i];

        const product = await Product.findById(order.productId);
        if(!product)
        {
            throw new Error("Product Not Found");
        }

        product.stock -= order.quantity;

        await product.save();
    }
}