const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        storeName: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        logo: String,
        policy: String,
        shippingPolicy: String,
        returnPolicy: String,
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        totalSales: {
            type: Number,
            default: 0
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        status: {
            type: String,
            enum: ['active', 'inactive', 'suspended'],
            default: 'active'
        },
    }, 
    { 
        timestamps: true 
    }
);

const Store = mongoose.model("Store", StoreSchema);
module.exports = Store;