const Product = require('../models/product.model.js');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchProducts = async (req, res) => {
    try {
        const { tags, categoryId, storeId, minPrice, maxPrice, minRating, maxRating } = req.query;
        let filters = {};

        if (tags) filters.tags = { $in: tags.split(',') };
        if (categoryId) filters.categoryId = categoryId;
        if (storeId) filters.storeId = storeId;
        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.$gte = parseFloat(minPrice);
            if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
        }
        if (minRating || maxRating) {
            filters.rating = {};
            if (minRating) filters.rating.$gte = parseFloat(minRating);
            if (maxRating) filters.rating.$lte = parseFloat(maxRating);
        }

        const products = await Product.find(filters);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        if (req.user.role !== 'seller') {
            return res.status(403).json({ message: 'Access denied. Only sellers can create products.' });
        }
        const product = new Product({ ...req.body, storeId: req.user.storeId });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, storeId: req.user.storeId },
            req.body,
            { new: true }
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, storeId: req.user.storeId });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    searchProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};