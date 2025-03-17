const express = require('express');
const Review = require('../models/review.model.js');
const router = express.Router();
const {getReviews, getReview, createReview, updateReview, deleteReview} = require('../controllers/review.controller.js');

router.get('/', getReviews);

router.get("/:id", getReview);

router.post("/", createReview);

// Update a review
router.put("/:id", updateReview);

// Delete a review
router.delete("/:id", deleteReview);

module.exports = router;