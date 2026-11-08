import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();
app.use(express.json());

//Routes

//Get all products
app.get("/api/products", async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
});

//Create Product
app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

//delete Product
app.post("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
});
app.listen(3000, () => {
  connectDb();
  console.log("Server started at http://localhost:3000");
});
