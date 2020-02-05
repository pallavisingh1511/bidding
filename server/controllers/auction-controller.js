const Auction = require('../models/auction-model')

placeBid = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Please provide the details',
        })
    }

    // get all the bids for the same user
    Auction.find({ name: body.name }, (err, bid) => {
        if (err) {
            return { success: false, error: err }
        }
        if (bid.length >= 3) {
            return res.status(400).json({
                err,
                message: 'You\'ve already placed your bid 3 times',
            })
        }
        return setBid(body, res)
    }).catch(err => console.log(err))
}

setBid = async (body, res) => {
    const auction = new Auction(body)

    if (!auction) {
        return res.status(400).json({ success: false, error: err })
    }

    await auction
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
