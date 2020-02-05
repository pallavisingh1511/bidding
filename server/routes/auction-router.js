const express = require('express')

const AuctionController = require('../controllers/auction-controller')

const router = express.Router()

router.post('/auction', AuctionController.placeBid)
router.get('/leaderboard', AuctionController.getLeaderboard)

module.exports = router
