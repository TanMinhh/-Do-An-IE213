const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        conversationId: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        attachments: [{
            type: {
            type: String,
            enum: ['image', 'file']
            },
            url: String,
            name: String,
            size: Number
        }],
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

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;