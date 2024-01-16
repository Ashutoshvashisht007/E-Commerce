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
            const sixMonthAgo = new Date();

            sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

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

            // last six month 

            const sixMonthOrders = Order.find({
                createdAt: {
                    $gte: sixMonthAgo,
                    $lte: today,
                }
            });

            const latestTransaction = Order.find({}).select(["orderItems", "total", "discount", "status"]).limit(4);

            const [monthProducts, monthUsers, monthOrders, prevProducts, prevUsers, prevOrders, productsCount, usersCount, allOrders, prevSixMonthOrders, categories, femaleCount, maleCount, transactions] = await Promise.all(
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
                    sixMonthOrders,
                    Product.distinct("category"),
                    User.countDocuments({ gender: "female" }),
                    User.countDocuments({ gender: "male" }),
                    latestTransaction,
                ]
            );

            const MonthRevenue = monthOrders.reduce(
                (total, order) => total + (order.total || 0), 0
            );
            const prevMonthRevenue = prevOrders.reduce(
                (total, order) => total + (order.total || 0), 0
            );

            const precent = {

                revenue: calculatePercentage(MonthRevenue, prevMonthRevenue),

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
                (total, order) => total + (order.total || 0), 0
            );

            const count = {
                revenue: Revenue,
                product: productsCount,
                user: usersCount,
                order: allOrders.length,
            }

            const orderMonthCounts = new Array(6).fill(0);
            const orderMonthRevenue = new Array(6).fill(0);

            prevSixMonthOrders.forEach((order) => {
                const orderCreated = order.createdAt;
                const monthDiff = today.getMonth() - orderCreated.getMonth();

                if (monthDiff < 6) {
                    orderMonthCounts[6 - monthDiff - 1] += 1;
                    orderMonthRevenue[6 - monthDiff - 1] += order.total;
                }
            });

            const countCategoriesArr = categories.map((category) =>
                Product.countDocuments({ category })
            );

            const countCategory = await Promise.all(countCategoriesArr);

            const releationOfCategories: Record<string, number>[] = [];

            categories.forEach((category, idx) => {
                releationOfCategories.push({
                    [category]: Math.round((countCategory[idx] / productsCount) * 100),
                });
            });

            const genderRatio = {
                male: maleCount,
                female: femaleCount,
                others: usersCount - (maleCount + femaleCount),
            }

            const modifiedTransanction = transactions.map(idx => ({
                _id: idx._id,
                discount: idx.discount,
                total: idx.total,
                status: idx.status,
                quantity: idx.orderItems.length
            }))

            stats = {
                releationOfCategories,
                precent,
                count,
                chart: {
                    order: orderMonthCounts,
                    revenue: orderMonthRevenue,
                },
                genderRatio,
                latesttransactions: modifiedTransanction,
            };

            nodeCache.set("admin-stats", JSON.stringify(stats));
        }

        return res.status(200).json({
            success: true,
            stats,
        })

    }
);


export const dashboardPie = TryCatchBlockWrapper(
    async (req, res, next) => {

        let charts;

        if (nodeCache.has("admit-pie-charts")) {
            charts = JSON.parse(nodeCache.get("admin-pie-charts") as string);
        }
        else {
            const productStatus = await Order.find({}).select("status");
            const len = productStatus.length;

            const [processingCount,shippingCount,deliveredCount] = await Promise.all([
                Order.countDocuments({status: "Processing"}),
                Order.countDocuments({status: "Shipped"}),
                Order.countDocuments({status: "Delivered"}),
            ])

            charts = {
                processingRatio: Math.round((processingCount / len) * 100),
                shippedRatio: Math.round((shippingCount / len) * 100),
                deliveredRatio: Math.round((deliveredCount / len) * 100),
            }
        }


        return res.status(200).json({
            success: true,
            charts,
        })
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