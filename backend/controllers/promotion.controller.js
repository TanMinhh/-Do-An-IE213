const Promotion = require('../models/promotion.model.js');

const getPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.find();
        res.status(200).json(promotions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPromotion = async (req, res) => {
    try {
        const promotion = await Promotion.findById(req.params.id);
        if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
        res.status(200).json(promotion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPromotion = async (req, res) => {
    try {
        if (req.user.role !== 'seller') {
            return res.status(403).json({ message: 'Access denied. Only sellers can create promotions.' });
        }
        const promotion = new Promotion({ ...req.body, storeId: req.user.storeId });
        await promotion.save();
        res.status(201).json(promotion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePromotion = async (req, res) => {
    try {
        const promotion = await Promotion.findOneAndUpdate(
            { _id: req.params.id, storeId: req.user.storeId },
            req.body,
            { new: true }
        );
        if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
        res.status(200).json(promotion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePromotion = async (req, res) => {
    try {
        const promotion = await Promotion.findOneAndDelete({ _id: req.params.id, storeId: req.user.storeId });
        if (!promotion) return res.status(404).json({ message: 'Promotion not found' });
        res.status(200).json({ message: 'Promotion deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPromotions,
    getPromotion,
    createPromotion,
    updatePromotion,
    deletePromotion,
};