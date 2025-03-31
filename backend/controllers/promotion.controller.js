const Promotion = require('../models/promotion.model.js');

const getPromotions = async (req, res) => {
    try {
        const promotion = await Promotion.find({});
        res.status(200).json(promotion);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getPromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const promotion = await Promotion.findById(id);
        res.status(200).json(promotion);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createPromotion = async (req, res) => {
    try {
        const promotion = await Promotion.create(req.body);
        res.status(200).json(promotion);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updatePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const promotion = await Promotion.findByIdAndUpdate(id, req.body);
        if(!promotion){
            return res.status(404).json({message: "Promotion not found"});
        }
        const updatedPromotion = await Promotion.findById(id);
        res.status(200).json(updatedPromotion);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deletePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const promotion = await Promotion.findByIdAndDelete(id);
        if(!promotion){
            return res.status(404).json({message: "Promotion not found"});
        }
        const updatedPromotion = await Promotion.findById(id);
        res.status(200).json({message: "Promotion deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getPromotions,
    getPromotion,
    createPromotion,
    updatePromotion,
    deletePromotion
};