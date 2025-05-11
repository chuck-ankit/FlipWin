import { useWallet } from '@/context/WalletContext';

export const RecentBets = () => {
  const { recentBets } = useWallet();

  if (!recentBets.length) {
    return (
      <div className="text-center text-gray-500 py-4">
        No recent bets
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Bets</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {recentBets.map((bet) => (
            <li key={bet._id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      bet.result === 'win' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <span className={`text-sm font-medium ${
                        bet.result === 'win' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {bet.result === 'win' ? 'W' : 'L'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {bet.walletAddress.slice(0, 4)}...{bet.walletAddress.slice(-4)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {bet.choice.charAt(0).toUpperCase() + bet.choice.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      bet.result === 'win' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {bet.result === 'win' ? '+' : '-'}{bet.amount} SOL
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(bet.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 