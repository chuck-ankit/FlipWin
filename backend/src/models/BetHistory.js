const mongoose = require('mongoose');

const betHistorySchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true
  },
  choice: {
    type: String,
    enum: ['head', 'tail'],
    required: true
  },
  result: {
    type: String,
    enum: ['win', 'loss'],
    required: true
  },
  payout: {
    type: Number,
    required: true
  },
  balanceBefore: {
    type: Number,
    required: true
  },
  balanceAfter: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
betHistorySchema.index({ timestamp: -1 });
betHistorySchema.index({ walletAddress: 1, timestamp: -1 });

module.exports = mongoose.model('BetHistory', betHistorySchema); 