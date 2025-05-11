require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { Connection } = require('@solana/web3.js');

// Import routes
const userRoutes = require('./routes/user');
const betRoutes = require('./routes/bet');
const statsRoutes = require('./routes/stats');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize Solana connection
const solanaConnection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');

// Routes
app.use('/api/user', userRoutes);
app.use('/api/bet', betRoutes);
app.use('/api/stats', statsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Function to start server
const startServer = async (port) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/flipwin');
    console.log('Connected to MongoDB');

    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying ${port + 1}`);
        startServer(port + 1);
      } else {
        console.error('Server error:', error);
      }
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start server with initial port
const PORT = process.env.PORT || 5000;
startServer(PORT); 