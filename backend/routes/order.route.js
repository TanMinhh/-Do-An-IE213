const express = require('express');
const router = express.Router();
const {getOrders, getOrder, createOrder, updateOrder, deleteOrder} = require('../controllers/order.controller.js');
const { authenticateToken } = require('../middleware/auth.middleware.js');

// Protected routes
router.get('/', authenticateToken, getOrders);
router.get("/:id", authenticateToken, getOrder);
router.post("/", authenticateToken, createOrder);
router.put("/:id", authenticateToken, updateOrder); // Update a order
router.delete("/:id", authenticateToken, deleteOrder); // Delete a order

module.exports = router;