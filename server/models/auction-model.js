const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Auction = new Schema(
    {
        name: { type: String, required: true },
        amount: { type: Number, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('auction', Auction)
