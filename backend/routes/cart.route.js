const express = require('express');
const { addToCart, updateCart, getUserCart } = require('../controllers/cart.controller');
const authUser = require('../middleware/auth');
const router = express.Router();

router.post('/get', authUser, getUserCart)
router.post('/add', authUser, addToCart)
router.post('/update', authUser, updateCart)

module.exports = router;