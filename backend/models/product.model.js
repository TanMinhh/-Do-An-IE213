const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store',
            required: false
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: false,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        shortDescription: {
            type: String,
            trim: true
        },
        price: {
            type: mongoose.Number,
            required: true,
            get: v => parseFloat(v)
        },
        salePrice: {
            type: mongoose.Number,
            get: v => parseFloat(v)
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        category: String,
        tags: [String],
        images: [String],
        videos: [String],
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        reviewCount: {
            type: Number,
            default: 0
        },
        sold: {
            type: Number,
            default: 0
        },
        dimensions: {
            length: Number,
            width: Number,
            height: Number,
            weight: Number
        },
        material: String,
        status: {
            type: String,
            enum: ['active', 'inactive', 'draft', 'outOfStock'],
            default: 'draft'
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;