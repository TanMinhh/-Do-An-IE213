const Review = require('../models/review.model.js');

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createReview = async (req, res) => {
    try {
        const review = new Review({ ...req.body, userId: req.user._id });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await Review.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json({ message: 'Review deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
};