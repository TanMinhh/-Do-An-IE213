const express = require('express');
const Store = require('../models/store.model.js');
const router = express.Router();
const {getStores, getStore, createStore, updateStore, deleteStore} = require('../controllers/store.controller.js');

router.get('/', getStores);

router.get("/:id", getStore);

router.post("/", createStore);

// Update a store
router.put("/:id", updateStore);

// Delete a store
router.delete("/:id", deleteStore);

module.exports = router;