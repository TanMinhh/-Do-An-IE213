const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        title: String,
        content: {
            type: String,
            required: true
        },
        images: [String],
        sellerResponse: {
            content: String,
            createdAt: {
            type: Date,
            default: Date.now
            }
        },
        isVerified: {
            type: Boolean,
            default: true
        },
    }, 
    { 
        timestamps: true 
    }
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;