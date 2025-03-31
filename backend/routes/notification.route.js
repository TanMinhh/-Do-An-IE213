const express = require('express');
const Notification = require('../models/notification.model.js');
const router = express.Router();
const {getNotifications, getNotification, createNotification, updateNotification, deleteNotification} = require('../controllers/notification.controller.js');

router.get('/', getNotifications);

router.get("/:id", getNotification);

router.post("/", createNotification);

// Update a notification
router.put("/:id", updateNotification);

// Delete a notification
router.delete("/:id", deleteNotification);

module.exports = router;