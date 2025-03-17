const Notification = require('../models/notification.model.js');

const getNotifications = async (req, res) => {
    try {
        const notification = await Notification.find({});
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, req.body);
        if(!notification){
            return res.status(404).json({message: "Notification not found"});
        }
        const updatedNotification = await Notification.findById(id);
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if(!notification){
            return res.status(404).json({message: "Notification not found"});
        }
        const updatedNotification = await Notification.findById(id);
        res.status(200).json({message: "Notification deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getNotifications,
    getNotification,
    createNotification,
    updateNotification,
    deleteNotification
};