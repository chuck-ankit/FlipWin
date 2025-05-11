import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletAdapter } from '@solana/wallet-adapter-base';

// Use devnet for testing
export const SOLANA_NETWORK = 'devnet';
export const connection = new Connection(
  clusterApiUrl(SOLANA_NETWORK),
  'confirmed'
);

export const getWalletAdapter = (): WalletAdapter => {
  return new PhantomWalletAdapter();
};

export const getWalletBalance = async (publicKey: PublicKey): Promise<number> => {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL; // Convert lamports to SOL
  } catch (error) {
    console.error('Error getting wallet balance:', error);
    // Return 0 if we can't get the balance
    return 0;
  }
};

export const connectWallet = async (): Promise<{ publicKey: PublicKey; adapter: WalletAdapter; balance: number }> => {
  const adapter = getWalletAdapter();
  
  try {
    await adapter.connect();
    if (!adapter.publicKey) {
      throw new Error('Failed to connect wallet');
    }
    
    // Try to get balance, but don't fail if we can't
    let balance = 0;
    try {
      balance = await getWalletBalance(adapter.publicKey);
    } catch (error) {
      console.warn('Could not get initial balance:', error);
    }
    
    return {
      publicKey: adapter.publicKey,
      adapter,
      balance
    };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

export const disconnectWallet = async (adapter: WalletAdapter): Promise<void> => {
  try {
    await adapter.disconnect();
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
    throw error;
  }
}; 