const Message = require('../models/message.model.js');

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [{ senderId: req.user._id }, { receiverId: req.user._id }],
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMessage = async (req, res) => {
    try {
        const message = await Message.findOne({
            _id: req.params.id,
            $or: [{ senderId: req.user._id }, { receiverId: req.user._id }],
        });
        if (!message) return res.status(404).json({ message: 'Message not found' });
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMessage = async (req, res) => {
    try {
        const message = new Message({ ...req.body, senderId: req.user._id });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMessage = async (req, res) => {
    try {
        const message = await Message.findOneAndUpdate(
            { _id: req.params.id, senderId: req.user._id },
            req.body,
            { new: true }
        );
        if (!message) return res.status(404).json({ message: 'Message not found' });
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findOneAndDelete({
            _id: req.params.id,
            senderId: req.user._id,
        });
        if (!message) return res.status(404).json({ message: 'Message not found' });
        res.status(200).json({ message: 'Message deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMessages,
    getMessage,
    createMessage,
    updateMessage,
    deleteMessage,
};