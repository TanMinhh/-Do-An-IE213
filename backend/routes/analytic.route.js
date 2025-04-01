const express = require('express');
const router = express.Router();
const { getAnalytics, getAnalytic, createAnalytic, updateAnalytic, deleteAnalytic } = require('../controllers/analytic.controller.js');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware.js');

// Protected routes
router.get('/', authenticateToken, authorizeRoles('admin','seller'), getAnalytics); 
router.get('/:id', authenticateToken, authorizeRoles('admin','seller'), getAnalytic);
router.post('/', authenticateToken, authorizeRoles('admin','seller'), createAnalytic); 
router.put('/:id', authenticateToken, authorizeRoles('admin','seller'), updateAnalytic); // Update an analytic
router.delete('/:id', authenticateToken, authorizeRoles('admin','seller'), deleteAnalytic); // Delete an analytic

module.exports = router;