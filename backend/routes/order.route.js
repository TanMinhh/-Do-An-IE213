const express = require('express');
const Order = require('../models/order.model.js');
const router = express.Router();
const {placeOrder, placeOrderStripe, verifyStripe, allOrders, userOrders, updateStatus, deleteOrder} = require('../controllers/order.controller.js');
const adminAuth = require('../middleware/adminAuth.js')
const authUser = require('../middleware/auth.js')

router.post("/place", authUser, placeOrder);

router.post("/stripe", authUser, placeOrderStripe);

router.post("/verifyStripe", authUser, verifyStripe);

router.post("/list", adminAuth, allOrders);

router.post("/status", adminAuth, updateStatus);

router.post("/orders", authUser, userOrders);

router.delete("/:id", deleteOrder);

module.exports = router;