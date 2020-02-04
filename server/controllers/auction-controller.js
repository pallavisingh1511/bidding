const Auction = require('../models/auction-model')

placeBid = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Please provide the details',
        })
    }

    const auction = new Auction(body)

    if (!auction) {
        return res.status(400).json({ success: false, error: err })
    }

    auction
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: auction._id,
                message: 'Bid placed successfully!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Placing bid failed!',
            })
        })
}

module.exports = {
    placeBid
}
