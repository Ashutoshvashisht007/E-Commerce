import { nodeCache } from "../app.js";
import { TryCatchBlockWrapper } from "../middlewares/Error.js";
import { Product } from "../schema/Product.js";


export const dashboardStats = TryCatchBlockWrapper(
    async (
        req,
        res,
        next,  
    )=>{

        let stats;

        if(nodeCache.has("admin-stats"))
        {
            stats = JSON.parse(nodeCache.get("admin-stats") as string);
        }
        else{
            const today = new Date();
        }

        return res.status(200).json({
            success: true,
            stats,
        })

    }
);
export const dashboardPie = TryCatchBlockWrapper(
    async ()=>{

    }
);
export const dashboardBar = TryCatchBlockWrapper(
    async ()=>{

    }
);
export const dashboardLine = TryCatchBlockWrapper(
    async ()=>{

    }
);