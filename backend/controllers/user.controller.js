const User = require('../models/user.model.js');

const getUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Only admins can view all users.' });
        }
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin' && req.user._id !== req.params.id) {
            return res.status(403).json({ message: 'Access denied. You can only view your own profile.' });
        }
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Only admins can create users.' });
        }
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin' && req.user._id !== req.params.id) {
            return res.status(403).json({ message: 'Access denied. You can only update your own profile.' });
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Only admins can delete users.' });
        }
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};