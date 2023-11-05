const { string } = require('hardhat/internal/core/params/argumentTypes');
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    requester: {
        required: true,
        type: String
    },
    requested: {
        required: true,
        type: String
    },
    access: {
        required: true,
        default: false,
        type: Boolean
    }
})
dataSchema.index({ requester: 1, requested: 1 }, { unique: true })
module.exports = mongoose.model('Access', dataSchema)