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
});

module.exports = mongoose.model('Post', PostSchema)