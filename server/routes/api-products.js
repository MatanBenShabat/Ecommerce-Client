const express = require("express");
const Products = require("../models/products");
const router = express.Router();
const productssControllers = require("../controllers/productsControllers");

router.get("/products", productssControllers.getProducts);

router.post("/products", productssControllers.createProduct);

router.patch("/products/:id", productssControllers.updateProduct);

router.delete("/products/:id", productssControllers.deleteProduct);

module.exports = router;
