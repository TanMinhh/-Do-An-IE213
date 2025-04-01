const Notification = require('../models/notification.model.js');

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user._id });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNotification = async (req, res) => {
    try {
        const notification = await Notification.findOne({ _id: req.params.id, userId: req.user._id });
        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createNotification = async (req, res) => {
    try {
        const notification = new Notification({ ...req.body, userId: req.user._id });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.status(200).json({ message: 'Notification deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNotifications,
    getNotification,
    createNotification,
    updateNotification,
    deleteNotification,
};