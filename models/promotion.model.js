const mongoose = require('mongoose');

const PromotionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true
        },
        discountType: {
            type: String,
            enum: ['percentage', 'fixed'],
            required: true
        },
        discountValue: {
            type: mongoose.Decimal128,
            required: true,
            get: v => parseFloat(v)
        },
        minimumOrderAmount: {
            type: mongoose.Decimal128,
            default: 0,
            get: v => parseFloat(v)
        },
        maximumDiscountAmount: {
            type: mongoose.Decimal128,
            get: v => parseFloat(v)
        },
        useLimit: {
            type: Number,
            default: 0 // No limitation
        },
        usedCount: {
            type: Number,
            default: 0
        },
        applicableProducts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        applicableCategories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }],
        applicableStores: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store'
        }],
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
    }, 
    { 
    timestamps: true,
    }
);

const Promotion = mongoose.model("Promotion", PromotionSchema);
module.exports = Promotion;