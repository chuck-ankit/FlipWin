import { useWallet } from '@/context/WalletContext';
import { StatsDisplay } from '@/components/StatsDisplay';
import { RecentBets } from '@/components/RecentBets';

export const Home = () => {
  const { isConnected, isDemoMode, walletAddress, balance, connectWallet, connectDemo } = useWallet();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        {/* Stats Section */}
        <section className="mb-8">
          <StatsDisplay />
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Betting Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Flip & Win</h1>
              
              {!isConnected ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Connect your wallet to start playing</p>
                  <div className="space-x-4">
                    <button
                      onClick={connectWallet}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Connect Wallet
                    </button>
                    <button
                      onClick={connectDemo}
                      className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Play Demo
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <p className="text-gray-600">
                      {isDemoMode ? 'Demo Mode' : 'Connected Wallet'}: {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">Balance: {balance.toFixed(2)} SOL</p>
                  </div>
                  
                  {/* Add your betting interface here */}
                </div>
              )}
            </div>
          </div>

          {/* Recent Bets Section */}
          <div className="lg:col-span-1">
            <RecentBets />
          </div>
        </div>
      </main>
    </div>
  );
}; 