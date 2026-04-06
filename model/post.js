const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema
({
    title:
    {
        type: String, 
        required: true, 
        trim: true
    },

    body:
    {
        type: String,
        required: true
    },

    images:
    [{
        type: String
    }],

    author:
    {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },

    hashtags:
    [{
        type: String
    }],

    //FOR FILTERING
    destination:
    {
        type: String,
        enum: ['Luzon', 'Visayas', 'Mindanao'],
        sparse: true
    },

    travelStyle:
    {
        type: String,
        enum: ['Budget', 'Family', 'Backpacking', 'Luxury', 'Solo'],
        sparse: true
    },

    upvotes:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    downvotes:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    commentCount:
    {
        type: Number,
        default: 0
    },

    createdAt:
    {
        type: Date, 
        default: Date.now
    },

    updatedAt:
    {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema)