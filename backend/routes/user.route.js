const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/user.controller.js');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware.js');

// Đăng ký user
router.post('/register', async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        const user = new User({ email, password, fullName });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Đăng nhập user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Protected routes
router.get('/', authenticateToken, authorizeRoles('admin'), getUsers); // Chỉ admin có thể xem danh sách người dùng
router.get('/:id', authenticateToken, getUser); // Người dùng có thể xem thông tin của chính họ
router.post('/', authenticateToken, authorizeRoles('admin'), createUser); // Chỉ admin có thể tạo người dùng
router.put('/:id', authenticateToken, updateUser); // Người dùng có thể cập nhật thông tin của chính họ
router.delete('/:id', authenticateToken, authorizeRoles('admin'), deleteUser); // Chỉ admin có thể xóa người dùng

module.exports = router;