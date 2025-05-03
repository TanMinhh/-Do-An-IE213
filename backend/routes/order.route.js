const express = require('express');
const Order = require('../models/order.model.js');
const router = express.Router();
const {placeOrder, placeOrderStripe, verifyStripe, allOrders, userOrders, updateStatus, deleteOrder} = require('../controllers/order.controller.js');
const adminAuth = require('../middleware/adminAuth.js')
const authUser = require('../middleware/auth.js')

// Đặt hàng (COD)
router.post("/place", authUser, placeOrder);

// Đặt hàng (Stripe)
router.post("/stripe", authUser, placeOrderStripe);

// Xác minh thanh toán Stripe
router.post("/verifyStripe", authUser, verifyStripe);

// Lấy danh sách tất cả đơn hàng (admin)
router.get("/list", adminAuth, allOrders);

// Lấy danh sách đơn hàng của một người dùng cụ thể
router.get("/orders", authUser, userOrders);

// Cập nhật trạng thái đơn hàng
router.put("/status", adminAuth, updateStatus);

// Xóa đơn hàng
router.delete("/:id", deleteOrder);

module.exports = router;
