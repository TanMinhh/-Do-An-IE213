const Order = require('../models/order.model.js');

const getOrders = async (req, res) => {
    try {
        const order = await Order.find({});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndUpdate(id, req.body);
        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        const updatedOrder = await Order.findById(id);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        const updatedOrder = await Order.findById(id);
        res.status(200).json({message: "Order deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
};