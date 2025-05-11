import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import { connectWallet, disconnectWallet, getWalletAdapter, getWalletBalance } from '@/lib/solana';
import { userApi, betApi, BetHistory } from '@/lib/api';
import { StatsDisplay } from '@/components/StatsDisplay';

interface WalletContextType {
  isConnected: boolean;
  isDemoMode: boolean;
  walletAddress: string | null;
  balance: number;
  bettingHistory: BetHistory[];
  recentBets: BetHistory[];
  connectWallet: () => Promise<void>;
  connectDemo: () => void;
  disconnectWallet: () => Promise<void>;
  placeBet: (amount: number, selection: 'head' | 'tail') => Promise<boolean>;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [bettingHistory, setBettingHistory] = useState<BetHistory[]>([]);
  const [recentBets, setRecentBets] = useState<BetHistory[]>([]);
  const [adapter, setAdapter] = useState(getWalletAdapter());

  // Fetch recent bets
  useEffect(() => {
    const fetchRecentBets = async () => {
      try {
        const bets = await betApi.getRecentBets(10);
        setRecentBets(bets);
      } catch (error) {
        console.error('Error fetching recent bets:', error);
      }
    };

    fetchRecentBets();
    // Refresh recent bets every 30 seconds
    const interval = setInterval(fetchRecentBets, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check if wallet is already connected
    if (adapter.connected && adapter.publicKey) {
      handleWalletConnection(adapter.publicKey);
    }
  }, []);

  const refreshBalance = async () => {
    if (walletAddress && !isDemoMode) {
      try {
        const publicKey = new PublicKey(walletAddress);
        const newBalance = await getWalletBalance(publicKey);
        setBalance(newBalance);
      } catch (error) {
        console.error('Error refreshing balance:', error);
      }
    }
  };

  const handleWalletConnection = async (publicKey: PublicKey) => {
    try {
      const address = publicKey.toString();
      setWalletAddress(address);
      setIsConnected(true);
      setIsDemoMode(false);

      // Get actual wallet balance
      const walletBalance = await getWalletBalance(publicKey);
      setBalance(walletBalance);

      // Initialize user in backend
      await userApi.initUser(address);

      // Fetch betting history
      const { bets } = await betApi.getBetHistory(address, 1, 10);
      setBettingHistory(bets);
    } catch (error) {
      console.error('Error initializing user:', error);
      setIsConnected(false);
      setWalletAddress(null);
    }
  };

  const handleConnectWallet = async () => {
    try {
      const { publicKey, adapter: newAdapter, balance: initialBalance } = await connectWallet();
      setAdapter(newAdapter);
      setBalance(initialBalance);
      await handleWalletConnection(publicKey);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleConnectDemo = () => {
    setIsConnected(true);
    setIsDemoMode(true);
    setWalletAddress('demo-wallet');
    setBalance(3); // Demo balance of 3 SOL
    setBettingHistory([]);
  };

  const handleDisconnectWallet = async () => {
    if (isDemoMode) {
      setIsConnected(false);
      setIsDemoMode(false);
      setWalletAddress(null);
      setBalance(0);
      setBettingHistory([]);
      return;
    }

    try {
      await disconnectWallet(adapter);
      setIsConnected(false);
      setIsDemoMode(false);
      setWalletAddress(null);
      setBalance(0);
      setBettingHistory([]);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const placeBet = async (amount: number, selection: 'head' | 'tail'): Promise<boolean> => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    if (amount > balance) {
      throw new Error('Insufficient balance');
    }

    try {
      if (isDemoMode) {
        // Simulate bet for demo mode
        const isWin = Math.random() > 0.5;
        setBalance(prev => isWin ? prev + amount : prev - amount);
        return isWin;
      }

      const result = await betApi.placeBet(walletAddress!, amount, selection);
      
      // Refresh actual wallet balance
      await refreshBalance();
      
      // Refresh betting history
      const { bets } = await betApi.getBetHistory(walletAddress!, 1, 10);
      setBettingHistory(bets);

      // Refresh recent bets
      const recentBets = await betApi.getRecentBets(10);
      setRecentBets(recentBets);

      return result.result === 'win';
    } catch (error) {
      console.error('Error placing bet:', error);
      throw error;
    }
  };

  return (
    <WalletContext.Provider 
      value={{ 
        isConnected,
        isDemoMode,
        walletAddress,
        balance,
        bettingHistory,
        recentBets,
        connectWallet: handleConnectWallet,
        connectDemo: handleConnectDemo,
        disconnectWallet: handleDisconnectWallet,
        placeBet,
        refreshBalance
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};