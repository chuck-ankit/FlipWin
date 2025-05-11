const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const BetHistory = require('../models/BetHistory');
const { PublicKey } = require('@solana/web3.js');
const axios = require('axios');

const router = express.Router();

// Place a bet
router.post('/',
  [
    body('walletAddress').custom(async (value) => {
      try {
        new PublicKey(value);
        return true;
      } catch (error) {
        throw new Error('Invalid Solana wallet address');
      }
    }),
    body('amount').isFloat({ min: 0.1, max: 10 }).withMessage('Bet amount must be between 0.1 and 10 SOL'),
    body('choice').isIn(['head', 'tail']).withMessage('Choice must be either head or tail')
  ],
  async (req, res) => {
    try {
      const { walletAddress, amount, choice } = req.body;

      const user = await User.findOne({ walletAddress });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.balance < amount) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }

      // Simulate coin flip (50/50 chance)
      const result = Math.random() > 0.5 ? 'win' : 'loss';
      
      // Calculate balance changes
      const balanceBefore = user.balance;
      const balanceChange = result === 'win' ? amount : -amount;
      const balanceAfter = balanceBefore + balanceChange;
      const payout = result === 'win' ? amount : 0;

      // Update user balance
      user.balance = balanceAfter;
      await user.save();

      // Save bet history
      const betHistory = new BetHistory({
        walletAddress,
        amount,
        choice,
        result,
        payout,
        balanceBefore,
        balanceAfter,
        timestamp: new Date()
      });
      await betHistory.save();

      // Update stats
      try {
        await axios.post(`${process.env.API_BASE_URL || 'http://localhost:5000'}/api/stats/update`, {
          betAmount: amount,
          isWin: result === 'win',
          walletAddress
        });
      } catch (error) {
        console.error('Error updating stats:', error);
      }

      res.json({
        success: true,
        result,
        newBalance: balanceAfter,
        betHistory
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get bet history for a user
router.get('/history/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const bets = await BetHistory.find({ walletAddress })
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await BetHistory.countDocuments({ walletAddress });

    res.json({
      bets,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get recent bets (for homepage)
router.get('/recent', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const bets = await BetHistory.find()
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .select('walletAddress amount choice result payout timestamp');

    res.json(bets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 