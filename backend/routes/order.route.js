const express = require('express');
const Order = require('../models/order.model.js');
const router = express.Router();
const {getOrders, getOrder, createOrder, updateOrder, deleteOrder} = require('../controllers/order.controller.js');

router.get('/', getOrders);

router.get("/:id", getOrder);

router.post("/", createOrder);

// Update a order
router.put("/:id", updateOrder);

// Delete a order
router.delete("/:id", deleteOrder);

module.exports = router;