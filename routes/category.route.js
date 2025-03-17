const express = require('express');
const Category = require('../models/category.model.js');
const router = express.Router();
const {getCategories, getCategory, createCategory, updateCategory, deleteCategory} = require('../controllers/category.controller.js');

router.get('/', getCategories);

router.get("/:id", getCategory);

router.post("/", createCategory);

// Update a category
router.put("/:id", updateCategory);

// Delete a category
router.delete("/:id", deleteCategory);

module.exports = router;