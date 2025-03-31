const Store = require('../models/store.model.js');

const getStores = async (req, res) => {
    try {
        const store = await Store.find({});
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getStore = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findById(id);
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createStore = async (req, res) => {
    try {
        const store = await Store.create(req.body);
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateStore = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByIdAndUpdate(id, req.body);
        if(!store){
            return res.status(404).json({message: "Store not found"});
        }
        const updatedStore = await Store.findById(id);
        res.status(200).json(updatedStore);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteStore = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByIdAndDelete(id);
        if(!store){
            return res.status(404).json({message: "Store not found"});
        }
        const updatedStore = await Store.findById(id);
        res.status(200).json({message: "Store deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getStores,
    getStore,
    createStore,
    updateStore,
    deleteStore
};