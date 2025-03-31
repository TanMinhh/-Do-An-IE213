const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        orderNumber: {
            type: String,
            required: true,
            unique: true
        },
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            storeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Store',
                required: true
            },
            name: String,
            price: {
                type: mongoose.Decimal128,
                required: true,
                get: v => parseFloat(v)
            },
            totalPrice: {
                type: mongoose.Decimal128,
                get: v => parseFloat(v)
            },
            isReviewed: {
                type: Boolean,
                default: false
            }
        }],
        storeOrders: [{
            storeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Store'
            },
            storeName: String,
            status: {
                type: String,
                enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
                default: 'pending'
            },
            shippingCode: String,
            shippingCarrier: String,
            totalAmount: {
                type: mongoose.Decimal128,
                get: v => parseFloat(v)
            }
        }],
        subTotal: {
            type: mongoose.Decimal128,
            required: true,
            get: v => parseFloat(v)
        },
        shippingFee: {
            type: mongoose.Decimal128,
            default: 0,
            get: v => parseFloat(v)
        },
        discount: {
            type: mongoose.Decimal128,
            default: 0,
            get: v => parseFloat(v)
        },
        couponCode: String,
        totalAmount: {
            type: mongoose.Decimal128,
            required: true,
            get: v => parseFloat(v)
        },
        paymentMethod: {
            type: String,
            enum: ['cod', 'creditCard', 'bankTransfer', 'eWallet'],
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded', 'partially_refunded'],
            default: 'pending'
        },
        transactionId: String,
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
            default: 'pending'
        },
        shippingAddress: {
            fullName: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            addressLine: {
                type: String,
                required: true
            },
            district: String,
            city: {
                type: String,
                required: true
            },
            zipCode: String
        },
        notes: String,
        completedAt: Date,
    }, 
    { 
    timestamps: true,
    }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
