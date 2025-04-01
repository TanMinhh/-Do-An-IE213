const express = require('express');
const router = express.Router();
const {getProducts, getProduct, searchProducts, createProduct, updateProduct, deleteProduct} = require('../controllers/product.controller.js');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware.js');

// Public routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get("/:id", getProduct);

// Protected routes
router.post("/", authenticateToken, authorizeRoles('seller'), createProduct);
router.put("/:id", authenticateToken, authorizeRoles('seller'), updateProduct); // Update a product
router.delete("/:id", authenticateToken, authorizeRoles('seller'), deleteProduct); // Delete a product

module.exports = router;