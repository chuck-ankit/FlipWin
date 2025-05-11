const express = require('express');
const Stats = require('../models/Stats');
const User = require('../models/User');
const BetHistory = require('../models/BetHistory');

const router = express.Router();

// Get current stats
router.get('/', async (req, res) => {
  try {
    // Get total bets from BetHistory collection
    const totalBets = await BetHistory.countDocuments();
    
    // Get active players (users who have placed at least one bet)
    const activePlayers = await User.countDocuments({
      walletAddress: { $in: await BetHistory.distinct('walletAddress') }
    });
    
    // Get biggest win
    const biggestWin = await BetHistory.findOne(
      { result: 'win' },
      { sort: { amount: -1 } }
    );

    // Update or create stats document
    const stats = await Stats.findOneAndUpdate(
      {},
      {
        totalBets,
        activePlayers,
        biggestWin: biggestWin ? {
          amount: biggestWin.amount,
          walletAddress: biggestWin.walletAddress,
          timestamp: biggestWin.timestamp
        } : {
          amount: 0,
          walletAddress: null,
          timestamp: null
        },
        lastUpdated: new Date()
      },
      { upsert: true, new: true }
    );

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update stats after a bet
router.post('/update', async (req, res) => {
  try {
    const { betAmount, isWin, walletAddress } = req.body;
    
    // Get current stats
    const stats = await Stats.findOne() || new Stats();
    
    // Update total bets
    stats.totalBets = await BetHistory.countDocuments();
    
    // Update active players
    stats.activePlayers = await User.countDocuments({
      walletAddress: { $in: await BetHistory.distinct('walletAddress') }
    });
    
    // Update biggest win if applicable
    if (isWin) {
      const currentBiggestWin = await BetHistory.findOne(
        { result: 'win' },
        { sort: { amount: -1 } }
      );

      if (currentBiggestWin && currentBiggestWin.amount > (stats.biggestWin?.amount || 0)) {
        stats.biggestWin = {
          amount: currentBiggestWin.amount,
          walletAddress: currentBiggestWin.walletAddress,
          timestamp: currentBiggestWin.timestamp
        };
      }
    }
    
    stats.lastUpdated = new Date();
    await stats.save();
    
    res.json(stats);
  } catch (error) {
    console.error('Error updating stats:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 