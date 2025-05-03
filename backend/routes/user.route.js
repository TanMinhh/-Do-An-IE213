const express = require('express');
const User = require('../models/user.model.js');
const router = express.Router();
const {getUsers, getUser, createUser, updateUser, deleteUser, loginUser, adminLogin} = require('../controllers/user.controller.js');

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", createUser);

router.post("/login", loginUser);

router.post("/admin", adminLogin);

// Update a user
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

module.exports = router;