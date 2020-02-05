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
            Auction.find({}, (err, auction) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if(auction.length) {
                    let winner = removeDuplicates(auction)
                    if (winner === body.name) {
                        return res.status(201).json({
                            success: true,
                            id: auction._id,
                            message: 'Congratulations! You\'re the winner',
                        })
                    } else {
                        return res.status(201).json({
                            success: true,
                            id: auction._id,
                            message: 'Better luck next time!',
                        })
                    }
                }
            }).sort({"createdAt": 1})
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Placing bid failed!',
            })
        })

}
function removeDuplicates (auction) {
    const lookup = auction.reduce((a, e) => {
        a[e.amount] = ++a[e.amount] || 0;
        return a;
    }, {});

    let uniqueBids = auction.filter(e => !lookup[e.amount])
    if(uniqueBids.length) {
        return uniqueBids[0].name
    } else {
        return auction[0].name
    }
}

module.exports = {
    placeBid
}
