const express = require('express');
const router = express.Router();
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller.js');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware.js');

// Public routes
router.get('/', getCategories); 
router.get('/:id', getCategory); 

// Protected routes
router.post('/', authenticateToken, authorizeRoles('admin'), createCategory); 
router.put('/:id', authenticateToken, authorizeRoles('admin'), updateCategory); // Update a category
router.delete('/:id', authenticateToken, authorizeRoles('admin'), deleteCategory); // Delete a category

module.exports = router;