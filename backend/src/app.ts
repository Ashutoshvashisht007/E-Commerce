import express from "express";

// importing Routes
import userRoute from "./routes/User.js"
import userProducts from "./routes/Products.js"
import { connectDB } from "./utils/Features.js";
import { errorMiddleware } from "./middlewares/Error.js";

const port =  3000;
connectDB();
const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is Working");
})

// using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", userProducts);

app.use(errorMiddleware);
app.use("/uploads", express.static("uploads"));

app.listen(port, ()=>{
    console.log(`Server is working on http://localhost:${port}`);
})