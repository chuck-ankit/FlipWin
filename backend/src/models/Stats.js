const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  totalBets: {
    type: Number,
    default: 0
  },
  activePlayers: {
    type: Number,
    default: 0
  },
  biggestWin: {
    amount: {
      type: Number,
      default: 0
    },
    walletAddress: {
      type: String,
      default: null
    },
    timestamp: {
      type: Date,
      default: null
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create a single document for stats
statsSchema.statics.getStats = async function() {
  let stats = await this.findOne();
  if (!stats) {
    stats = await this.create({});
  }
  return stats;
};

module.exports = mongoose.model('Stats', statsSchema); 