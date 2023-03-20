const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    contact: {
        type: Number,
        trim: true
    },
    message: {
        type: String,
        lowercase: true,
        trim: true
    }
})

module.exports = mongoose.model('subscriber', subscriberSchema)