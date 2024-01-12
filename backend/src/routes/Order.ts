import express from "express";
import { adminOnly } from "../middlewares/Auth.js";
import { newOrder } from "../controllers/Order.js";

const app = express.Router();

app.post("/new", newOrder);

export default app;