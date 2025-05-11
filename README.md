# FlipWin - Solana Coin Flip Betting Game

FlipWin is a decentralized coin flip betting game built on the Solana blockchain. Players can bet SOL tokens on coin flips, with a 50/50 chance of winning or losing their bet amount.

## Features

- 🎮 Real-time coin flip betting
- 💰 Solana wallet integration
- 📊 Live statistics and betting history
- 👥 Active player tracking
- 🏆 Biggest win tracking
- 🎯 Demo mode for testing
- 📱 Responsive design
- 🔒 Secure betting system

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Solana Web3.js
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Solana Web3.js

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Solana wallet (Phantom recommended)
- Solana devnet SOL for testing

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ankitkumar9864/FlipWin.git
cd FlipWin
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create environment files:

Backend (.env):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flipwin
SOLANA_RPC_URL=https://api.devnet.solana.com
```

Frontend (.env):
```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Testing with Devnet

1. Install Phantom wallet browser extension
2. Switch to Solana Devnet in Phantom settings
3. Get devnet SOL from a faucet
4. Connect your wallet to the application

## Demo Mode

If you don't want to use real SOL:
1. Click "Play Demo" button
2. You'll receive 3 demo SOL to test the game
3. Place bets and see how the game works

## Project Structure

```
FlipWin/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   └── pages/
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Ankit Kumar - [ankitkumar9864@gmail.com](mailto:ankitkumar9864@gmail.com)

Project Link: [https://github.com/ankitkumar9864/FlipWin](https://github.com/ankitkumar9864/FlipWin)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Solana Foundation for the blockchain infrastructure
- Phantom wallet for the wallet integration
- MongoDB for the database
- All contributors and supporters of the project 