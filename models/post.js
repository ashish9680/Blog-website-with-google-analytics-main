const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    shortDescription: {
        type: [],
        required: true,
        lowercase: true,
        trim: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    postImage: {
        type: String,
        required: true,
    },
    mainDescription: {
        type: String,
        required: true,
    },
    comments: {
        type: Array,
        default: [],
        trim: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Blog', postSchema)