const Order = require('../models/order.model.js');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, userId: req.user._id });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const order = new Order({ ...req.body, userId: req.user._id });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
};