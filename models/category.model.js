const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: String,
        image: String,
        order: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }, 
    { 
        timestamps: true 
    }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;