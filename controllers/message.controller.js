const Message = require('../models/message.model.js');

const getMessages = async (req, res) => {
    try {
        const message = await Message.find({});
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findById(id);
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findByIdAndUpdate(id, req.body);
        if(!message){
            return res.status(404).json({message: "Message not found"});
        }
        const updatedMessage = await Message.findById(id);
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findByIdAndDelete(id);
        if(!message){
            return res.status(404).json({message: "Message not found"});
        }
        const updatedMessage = await Message.findById(id);
        res.status(200).json({message: "Message deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getMessages,
    getMessage,
    createMessage,
    updateMessage,
    deleteMessage
};