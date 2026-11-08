import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

//Routes

//Get all products
router.get("/", getAllProducts);

//Create Product
router.post("/", createProduct);

//Delete Product
router.delete("/:id", deleteProduct);

//Update Product
router.put("/:id", updateProduct);

export default router;
