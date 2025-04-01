const express = require('express');
const router = express.Router();
const { getMessages, getMessage, createMessage, updateMessage, deleteMessage } = require('../controllers/message.controller.js');
const { authenticateToken }  = require('../middleware/auth.middleware.js');

// Protected routes
router.get('/', authenticateToken, getMessages); 
router.get('/:id', authenticateToken, getMessage); 
router.post('/', authenticateToken, createMessage); 
router.put('/:id', authenticateToken, updateMessage); // Update a message
router.delete('/:id', authenticateToken, deleteMessage); // Delete a message

module.exports = router;