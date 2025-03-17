const express = require('express');
const Promotion = require('../models/promotion.model.js');
const router = express.Router();
const {getPromotions, getPromotion, createPromotion, updatePromotion, deletePromotion} = require('../controllers/promotion.controller.js');

router.get('/', getPromotions);

router.get("/:id", getPromotion);

router.post("/", createPromotion);

// Update a promotion
router.put("/:id", updatePromotion);

// Delete a promotion
router.delete("/:id", deletePromotion);

module.exports = router;