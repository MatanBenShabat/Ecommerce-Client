const express = require("express");
const productsController = require("../controllers/productsController");

const router = express.Router();

router
  .get(
    "/top-5-cheap",
    productsController.aliasTopProducts,
    productsController.getProducts
  )
  .get("/products-stats", productsController.getProductsStats)
  .get("/products", productsController.getProducts)
  .post("/products", productsController.createProduct)
  .patch("/products/:id", productsController.updateProduct)
  .delete("/products/?:id", productsController.deleteProduct);

module.exports = router;
