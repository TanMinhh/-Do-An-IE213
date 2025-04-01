const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        role: {
            type: String,
            enum: ['buyer', 'seller', 'admin'],
            required: true,
            default: 'buyer'
        },
        addresses: [{
            addressLine: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            zipCode: {
                type: String,
                required: true
            },
            isDefault: {
                type: Boolean,
                default: false
            }
        }],
        wishlist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        status: {
            type: String,
            enum: ['active', 'inactive', 'suspended'],
            default: 'active'
        },
        twoFactorEnabled: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    }
);
    
const User = mongoose.model("User", UserSchema);
module.exports = User;