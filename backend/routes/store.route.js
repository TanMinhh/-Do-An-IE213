const express = require('express');
const router = express.Router();
const {getStores, getStore, createStore, updateStore, deleteStore} = require('../controllers/store.controller.js');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware.js');

// Public routes
router.get('/', getStores);
router.get("/:id", getStore);

// Protected routes
router.post("/", authenticateToken, authorizeRoles('seller'), createStore);
router.put("/:id", authenticateToken, authorizeRoles('seller'), updateStore); // Update a store
router.delete("/:id", authenticateToken, authorizeRoles('seller'), deleteStore); // Delete a store

module.exports = router;