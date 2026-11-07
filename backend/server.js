import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

dotenv.config();

const app = express();

//Routes
app.get("/products", (req, res) => {
  res.send("Server is ready");
});

app.listen(3000, () => {
    connectDb();
  console.log("Server started at http://localhost:3000");
});
