import { nodeCache } from "../app.js";
import { TryCatchBlockWrapper } from "../middlewares/Error.js";
import { Order } from "../schema/Order.js";
import { Product } from "../schema/Product.js";
import { User } from "../schema/User.js";
import { calculatePercentage } from "../utils/Features.js";


export const dashboardStats = TryCatchBlockWrapper(
    async (
        req,
        res,
        next,
    ) => {

        let stats;

        if (nodeCache.has("admin-stats")) {
            stats = JSON.parse(nodeCache.get("admin-stats") as string);
        }
        else {
            const today = new Date();

            const thisMonth = {
                start: new Date(today.getFullYear(), today.getMonth(), 1), // starting date of this month
                end: today,
            }

            const lastMonth = {
                start: new Date(today.getFullYear(), today.getMonth() - 1, 1), // Last month 1st date
                end: new Date(today.getFullYear(), today.getMonth(), 0) // Last month last date
            }

            const thisMonthProducts = Product.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end
                },
            });

            const lastMonthProducts = Product.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end
                },
            });

            const thisMonthUsers = User.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end
                },
            });

            const lastMonthUsers = User.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end
                },
            });

            const thisMonthOrders = Order.find({
                createdAt: {
                    $gte: thisMonth.start,
                    $lte: thisMonth.end
                },
            });

            const lastMonthOrders = Order.find({
                createdAt: {
                    $gte: lastMonth.start,
                    $lte: lastMonth.end
                },
            });

            const [monthProducts, monthUsers, monthOrders, prevProducts, prevUsers, prevOrders, productsCount, usersCount, allOrders] = await Promise.all(
                [
                    thisMonthProducts,
                    thisMonthUsers,
                    thisMonthOrders,
                    lastMonthProducts,
                    lastMonthUsers,
                    lastMonthOrders,
                    Product.countDocuments(),
                    User.countDocuments(),
                    Order.find({}).select("total"),
                ]
            );

            const MonthRevenue = monthOrders.reduce(
                (total,order) => total + (order.total || 0), 0
                );
            const prevMonthRevenue = prevOrders.reduce(
                (total,order) => total + (order.total || 0), 0
                );

            const precent = {

                revenue: calculatePercentage(MonthRevenue,prevMonthRevenue),

                product: calculatePercentage(
                         monthProducts.length, 
                         prevProducts.length
                         ),

          
                         user: calculatePercentage(
                      monthUsers.length, 
                      prevUsers.length
                      ),
                
                order: calculatePercentage(
                       monthOrders.length, 
                       prevOrders.length
                       ),

            };

            const Revenue = allOrders.reduce(
                (total,order) => total + (order.total || 0), 0
                );

            const count = {
                revenue: Revenue,
                product: productsCount,
                user: usersCount,
                order: allOrders.length,
            }

            stats = {
                precent,
                count
            }

        }

        return res.status(200).json({
            success: true,
            stats,
        })

    }
);
export const dashboardPie = TryCatchBlockWrapper(
    async () => {

    }
);
export const dashboardBar = TryCatchBlockWrapper(
    async () => {

    }
);
export const dashboardLine = TryCatchBlockWrapper(
    async () => {

    }
);