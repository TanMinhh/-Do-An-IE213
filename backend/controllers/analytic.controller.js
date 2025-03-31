const Analytic = require('../models/analytic.model.js');

const getAnalytics = async (req, res) => {
    try {
        const analytic = await Analytic.find({});
        res.status(200).json(analytic);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getAnalytic = async (req, res) => {
    try {
        const { id } = req.params;
        const analytic = await Analytic.findById(id);
        res.status(200).json(analytic);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createAnalytic = async (req, res) => {
    try {
        const analytic = await Analytic.create(req.body);
        res.status(200).json(analytic);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateAnalytic = async (req, res) => {
    try {
        const { id } = req.params;
        const analytic = await Analytic.findByIdAndUpdate(id, req.body);
        if(!analytic){
            return res.status(404).json({message: "Analytic not found"});
        }
        const updatedAnalytic = await Analytic.findById(id);
        res.status(200).json(updatedAnalytic);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteAnalytic = async (req, res) => {
    try {
        const { id } = req.params;
        const analytic = await Analytic.findByIdAndDelete(id);
        if(!analytic){
            return res.status(404).json({message: "Analytic not found"});
        }
        const updatedAnalytic = await Analytic.findById(id);
        res.status(200).json({message: "Analytic deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getAnalytics,
    getAnalytic,
    createAnalytic,
    updateAnalytic,
    deleteAnalytic
};