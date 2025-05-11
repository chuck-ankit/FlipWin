# FlipWin Frontend

The frontend of FlipWin is built with React, TypeScript, and Tailwind CSS, providing a modern and responsive user interface for the Solana-based coin flip betting game.

## Features

- 🎮 Interactive coin flip betting interface
- 💰 Solana wallet integration with Phantom
- 📊 Real-time statistics display
- 📱 Fully responsive design
- 🎯 Demo mode for testing
- 🔄 Live bet history updates
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure wallet connection

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Solana Web3.js
- Axios
- React Icons

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Phantom wallet browser extension
- Backend server running (see backend README)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── StatsDisplay.tsx
│   │   ├── RecentBets.tsx
│   │   └── Footer.tsx
│   ├── context/           # React context providers
│   │   └── WalletContext.tsx
│   ├── lib/              # Utility functions and API clients
│   │   ├── api.ts
│   │   └── solana.ts
│   ├── pages/            # Page components
│   │   └── Home.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/               # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Key Components

### WalletContext
- Manages wallet connection state
- Handles demo mode
- Manages betting history
- Provides wallet-related functions

### StatsDisplay
- Shows real-time statistics
- Auto-refreshes every 30 seconds
- Displays total bets, active players, and biggest win

### RecentBets
- Shows latest betting activity
- Updates in real-time
- Displays bet amount, choice, and result

## Styling

The project uses Tailwind CSS for styling. Key features:
- Responsive design
- Dark/light mode support
- Custom animations
- Consistent color scheme

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Testing

Run tests:
```bash
npm test
```

## Contributing

Please refer to the main [CONTRIBUTING.md](../CONTRIBUTING.md) file for contribution guidelines.

## Troubleshooting

### Common Issues

1. **Wallet Connection Issues**
   - Ensure Phantom wallet is installed
   - Check if you're on the correct network (Devnet)
   - Clear browser cache if needed

2. **API Connection Issues**
   - Verify backend server is running
   - Check environment variables
   - Ensure CORS is properly configured

3. **Build Issues**
   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify all dependencies are installed

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 