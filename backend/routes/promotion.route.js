const express = require('express');
const router = express.Router();
const {getPromotions, getPromotion, createPromotion, updatePromotion, deletePromotion} = require('../controllers/promotion.controller.js');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware.js');

// Public routes
router.get('/', getPromotions);
router.get("/:id", getPromotion);

// Protected routes
router.post("/", authenticateToken, authorizeRoles('seller'), createPromotion);
router.put("/:id", authenticateToken, authorizeRoles('seller'), updatePromotion); // Update a promotion
router.delete("/:id", authenticateToken, authorizeRoles('seller'), deletePromotion); // Delete a promotion

module.exports = router;