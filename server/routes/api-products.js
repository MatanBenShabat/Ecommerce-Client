const express = require("express");
const productsController = require("../controllers/productsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .get(
    "/top-5-cheap",
    productsController.aliasTopProducts,
    productsController.getProducts
  )
  .get("/products-stats", productsController.getProductsStats);

router
  .get("/products", authController.protect, productsController.getProducts)
  .get("/products/:id", productsController.getProduct)
  .post("/products", productsController.createProduct)
  .patch("/products/:id", productsController.updateProduct)
  .delete(
    "/products/?:id",
    authController.protect,
    authController.restrictTo("admin", "seller"),
    productsController.deleteProduct
  );

module.exports = router;
