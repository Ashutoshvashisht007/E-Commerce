import express from "express";
import { adminOnly } from "../middlewares/Auth.js";
import { newProduct } from "../controllers/Product.js";
import { singleUpload } from "../middlewares/Multer.js";

const app = express.Router();

app.post("/new",singleUpload, newProduct);

export default app;