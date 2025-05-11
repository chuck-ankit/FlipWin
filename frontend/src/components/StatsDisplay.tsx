import { useEffect, useState } from 'react';
import axios from 'axios';

interface Stats {
  totalBets: number;
  activePlayers: number;
  biggestWin: {
    amount: number;
    walletAddress: string;
    timestamp: string;
  };
  lastUpdated: string;
}

export const StatsDisplay = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setError(null);
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 text-center animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-500 p-4">
        No stats available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Total Bets</h3>
        <p className="text-3xl font-bold text-blue-600">{stats.totalBets.toLocaleString()}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Active Players</h3>
        <p className="text-3xl font-bold text-green-600">{stats.activePlayers.toLocaleString()}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Biggest Win</h3>
        <p className="text-3xl font-bold text-purple-600">{stats.biggestWin.amount.toFixed(2)} SOL</p>
        {stats.biggestWin.walletAddress && (
          <p className="text-sm text-gray-500 mt-2">
            by {stats.biggestWin.walletAddress.slice(0, 4)}...{stats.biggestWin.walletAddress.slice(-4)}
          </p>
        )}
      </div>
    </div>
  );
}; 