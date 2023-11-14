const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Rutas para productos
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", authMiddleware.requireAuth, productController.createProduct);
router.put("/:id", authMiddleware.requireAuth, productController.updateProduct);
router.delete(
  "/:id",
  authMiddleware.requireAuth,
  productController.deleteProduct
);

module.exports = router;
