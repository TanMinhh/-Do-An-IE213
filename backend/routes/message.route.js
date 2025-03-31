const express = require('express');
const Message = require('../models/message.model.js');
const router = express.Router();
const {getMessages, getMessage, createMessage, updateMessage, deleteMessage} = require('../controllers/message.controller.js');

router.get('/', getMessages);

router.get("/:id", getMessage);

router.post("/", createMessage);

// Update a message
router.put("/:id", updateMessage);

// Delete a message
router.delete("/:id", deleteMessage);

module.exports = router;