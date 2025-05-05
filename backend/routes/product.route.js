const express = require('express');
const Product = require('../models/product.model.js');
const router = express.Router();
const {addProduct, listProducts, getProduct, searchProducts, updateProduct, deleteProduct} = require('../controllers/product.controller.js');
const upload = require('../middleware/multer.js');
const adminAuth = require('../middleware/adminAuth.js');

// Add a product (admin site)
router.post("/add", adminAuth, upload.fields([{name:'image1',maxCount:1}, {name:'image2',maxCount:1}, {name:'image3',maxCount:1}, {name:'image4',maxCount:1}]), addProduct);

// List all products
router.get("/list", listProducts);

// Search a product
router.get("/search", searchProducts);

// Find a product by id
router.get("/:id", getProduct);

// Update a product
router.put("/:id", updateProduct);

// Delete a product
router.post("/remove", adminAuth, deleteProduct);

module.exports = router;
