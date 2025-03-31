const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        type: {
            type: String,
            enum: ['order', 'product', 'promotion', 'system', 'message'],
            required: true
        },
        title: String,
        message: {
            type: String,
            required: true
        },
        image: String,
        referenceId: {
            type: mongoose.Schema.Types.ObjectId
        },
        referenceType: {
            type: String,
            enum: ['order', 'product', 'promotion', 'store', 'user', 'message']
        },
        isRead: {
            type: Boolean,
            default: false
        },
    }, 
    { 
        timestamps: { 
            createdAt: true, 
            updatedAt: false 
        } 
    }
);

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;