import { Request } from "express";
import { TryCatchBlockWrapper } from "../middlewares/Error.js";
import { NewOrderRequestBody } from "../types/Types.js";
import { Order } from "../schema/Order.js";
import { invalidatesCache, reduceStock } from "../utils/Features.js";
import ErrorHandler from "../utils/Utility_Class.js";


export const newOrder = TryCatchBlockWrapper(
    async (
        req: Request< {}, {}, NewOrderRequestBody>,
        res,
        next,
    )=>{

    const {shippingInfo, orderItems, user, subtotal, tax, shippingCharges, discount, total} = req.body;

    if(!shippingInfo || !orderItems || !user || !subtotal || !tax || !shippingCharges || !discount || !total)
    {
        return next(new ErrorHandler("Please Enter All fields",400)); 
    }

    await Order.create({
        shippingInfo, orderItems, user, subtotal, tax, shippingCharges, discount, total
    });

    await reduceStock(orderItems);

    await invalidatesCache({product : true, order: true, admin: true});

    return res.status(201).json({
        success: "Order Placed Successfuly",
    })

})