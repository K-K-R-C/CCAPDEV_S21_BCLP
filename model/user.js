const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema
({
    username: 
    {
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    },

    displayname:
    {
        type: String,
        required: true,
        trim: true
    },

    password:
    {
        type: String, 
        required: true
    },

    bio:
    {
        type: String, 
        default: ''
    },

    profilePic:
    {
        type: String, 
        default: '/images/guest-profile.png'
    },

    location:
    {
        type: String, 
        default: ''
    },

    followers:
    {
        type: Number, 
        default: 0
    },

    following:
    {
        type: Number, 
        default: 0
    },

    postCount:
    {
        type: Number,
        default: 0
    },

    createdAt:
    {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);