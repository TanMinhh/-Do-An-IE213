const express = require('express');
const Product = require('../models/product.model.js');
const router = express.Router();
const {addProduct, listProducts, getProduct, searchProducts, updateProduct, deleteProduct} = require('../controllers/product.controller.js');
const upload = require('../middleware/multer.js');
const adminAuth = require('../middleware/adminAuth.js');

router.post("/add", adminAuth, upload.fields([{name:'image1',maxCount:1}, {name:'image2',maxCount:1}, {name:'image3',maxCount:1}, {name:'image4',maxCount:1}]), addProduct);

router.get("/list", listProducts);

router.get("/search", searchProducts);

router.get("/:id", getProduct);

// Update a product
router.put("/:id", updateProduct);

// Delete a product
<<<<<<< HEAD
router.post("/remove", adminAuth, deleteProduct);
=======
router.delete("/remove/:id", deleteProduct);
>>>>>>> 5e63dac01a37d4cf69d568001a007f2591e18d43

module.exports = router;
