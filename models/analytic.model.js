const mongoose = require('mongoose');

const AnalyticSchema = mongoose.Schema(
    {
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store',
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        sales: {
            totalAmount: {
                type: mongoose.Decimal128,
                default: 0,
                get: v => parseFloat(v)
            },
            orderCount: {
                type: Number,
                default: 0
            },
            productsSold: {
                type: Number,
                default: 0
            },
            averageOrderValue: {
                type: mongoose.Decimal128,
                default: 0,
                get: v => parseFloat(v)
            }
        },
        traffic: {
            visitors: {
                type: Number,
                default: 0
            },
            pageViews: {
                type: Number,
                default: 0
            },
            uniqueVisitors: {
                type: Number,
                default: 0
            },
            bounceRate: {
                type: Number,
                default: 0
            }
        },
        productViews: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            views: Number
        }],
        conversionRate: {
            type: Number,
            default: 0
        },
    }, 
    { 
        timestamps: true,
    }
);

const Analytic = mongoose.model("Analytic", AnalyticSchema);
module.exports = Analytic;