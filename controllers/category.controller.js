const Category = require('../models/category.model.js');

const getCategories = async (req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, req.body);
        if(!category){
            return res.status(404).json({message: "Category not found"});
        }
        const updatedCategory = await Category.findById(id);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if(!category){
            return res.status(404).json({message: "Category not found"});
        }
        const updatedCategory = await Category.findById(id);
        res.status(200).json({message: "Category deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};