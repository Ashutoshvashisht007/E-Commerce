import express from "express";
import { adminOnly } from "../middlewares/Auth.js";
import { getAdminProducts, getAllCategories, getLatestProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/Product.js";
import { singleUpload } from "../middlewares/Multer.js";

const app = express.Router();

app.post("/new", adminOnly ,singleUpload, newProduct);
app.get("/latest", getLatestProducts);
app.get("/categories", getAllCategories);
app.get("/admin-products", getAdminProducts);

app.get("/:id",getSingleProduct);
app.put("/:id",updateProduct);

export default app;