const express = require('express');
const router = express.Router();
const {getNotifications, getNotification, createNotification, updateNotification, deleteNotification} = require('../controllers/notification.controller.js');
const { authenticateToken } = require('../middleware/auth.middleware.js');

// Protected routes
router.get('/', authenticateToken, getNotifications);
router.get("/:id", authenticateToken, getNotification);
router.post("/", authenticateToken, createNotification);
router.put("/:id", authenticateToken, updateNotification); // Update a notification
router.delete("/:id", authenticateToken, deleteNotification); // Delete a notification

module.exports = router;