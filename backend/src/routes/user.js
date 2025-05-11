const express = require('express');
const { body, param } = require('express-validator');
const User = require('../models/User');
const { PublicKey } = require('@solana/web3.js');

const router = express.Router();

// Initialize user
router.post('/init',
  body('walletAddress').custom(async (value) => {
    try {
      new PublicKey(value);
      return true;
    } catch (error) {
      throw new Error('Invalid Solana wallet address');
    }
  }),
  async (req, res) => {
    try {
      const { walletAddress } = req.body;

      let user = await User.findOne({ walletAddress });
      
      if (!user) {
        user = await User.create({
          walletAddress,
          balance: 3 // Initial balance of 3 SOL
        });
      }

      res.json({ balance: user.balance });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get user details
router.get('/:walletAddress',
  param('walletAddress').custom(async (value) => {
    try {
      new PublicKey(value);
      return true;
    } catch (error) {
      throw new Error('Invalid Solana wallet address');
    }
  }),
  async (req, res) => {
    try {
      const { walletAddress } = req.params;
      
      const user = await User.findOne({ walletAddress });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        balance: user.balance,
        bettingHistory: user.bettingHistory
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router; 