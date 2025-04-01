const express = require('express');
const router = express.Router();
const {getReviews, getReview, createReview, updateReview, deleteReview} = require('../controllers/review.controller.js');
const { authenticateToken } = require('../middleware/auth.middleware.js');

// Public routes
router.get('/', getReviews);
router.get("/:id", getReview);

// Protected routes
router.post("/", authenticateToken, createReview);
router.put("/:id", authenticateToken, updateReview); // Update a review
router.delete("/:id", authenticateToken, deleteReview); // Delete a review

module.exports = router;