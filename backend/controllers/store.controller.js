const Store = require('../models/store.model.js');

const getStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) return res.status(404).json({ message: 'Store not found' });
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createStore = async (req, res) => {
    try {
        if (req.user.role !== 'seller') {
            return res.status(403).json({ message: 'Access denied. Only sellers can create stores.' });
        }
        const store = new Store({ ...req.body, ownerId: req.user._id });
        await store.save();
        res.status(201).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateStore = async (req, res) => {
    try {
        const store = await Store.findOneAndUpdate(
            { _id: req.params.id, ownerId: req.user._id },
            req.body,
            { new: true }
        );
        if (!store) return res.status(404).json({ message: 'Store not found' });
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteStore = async (req, res) => {
    try {
        const store = await Store.findOneAndDelete({ _id: req.params.id, ownerId: req.user._id });
        if (!store) return res.status(404).json({ message: 'Store not found' });
        res.status(200).json({ message: 'Store deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStores,
    getStore,
    createStore,
    updateStore,
    deleteStore,
};