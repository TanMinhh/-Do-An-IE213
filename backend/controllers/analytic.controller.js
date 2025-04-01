const Analytic = require('../models/analytic.model.js');

const getAnalytics = async (req, res) => {
    try {
        const analytics = await Analytic.find({ storeId: req.user.storeId });
        res.status(200).json(analytics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAnalytic = async (req, res) => {
    try {
        const analytic = await Analytic.findOne({ _id: req.params.id, storeId: req.user.storeId });
        if (!analytic) return res.status(404).json({ message: 'Analytic not found' });
        res.status(200).json(analytic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAnalytic = async (req, res) => {
    try {
        const analytic = new Analytic({ ...req.body, storeId: req.user.storeId });
        await analytic.save();
        res.status(201).json(analytic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAnalytic = async (req, res) => {
    try {
        const analytic = await Analytic.findOneAndUpdate(
            { _id: req.params.id, storeId: req.user.storeId },
            req.body,
            { new: true }
        );
        if (!analytic) return res.status(404).json({ message: 'Analytic not found' });
        res.status(200).json(analytic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAnalytic = async (req, res) => {
    try {
        const analytic = await Analytic.findOneAndDelete({ _id: req.params.id, storeId: req.user.storeId });
        if (!analytic) return res.status(404).json({ message: 'Analytic not found' });
        res.status(200).json({ message: 'Analytic deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAnalytics,
    getAnalytic,
    createAnalytic,
    updateAnalytic,
    deleteAnalytic,
};