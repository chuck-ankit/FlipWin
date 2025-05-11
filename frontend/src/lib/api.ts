import axios from 'axios';

// Get the backend URL from environment variable or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export interface UserResponse {
  balance: number;
  bettingHistory: BetHistory[];
}

export interface BetHistory {
  _id: string;
  walletAddress: string;
  amount: number;
  choice: 'head' | 'tail';
  result: 'win' | 'loss';
  payout: number;
  balanceBefore: number;
  balanceAfter: number;
  timestamp: string;
}

export interface BetHistoryResponse {
  bets: BetHistory[];
  total: number;
  page: number;
  totalPages: number;
}

export interface BetResponse {
  success: boolean;
  result: 'win' | 'loss';
  newBalance: number;
}

export const userApi = {
  initUser: async (walletAddress: string) => {
    const response = await axios.post(`${API_URL}/users`, { walletAddress });
    return response.data;
  },

  getUser: async (walletAddress: string) => {
    const response = await axios.get(`${API_URL}/users/${walletAddress}`);
    return response.data;
  },
};

export const betApi = {
  placeBet: async (walletAddress: string, amount: number, choice: 'head' | 'tail') => {
    const response = await axios.post(`${API_URL}/bet`, {
      walletAddress,
      amount,
      choice
    });
    return response.data;
  },

  getBetHistory: async (walletAddress: string, page = 1, limit = 10): Promise<BetHistoryResponse> => {
    const response = await axios.get(`${API_URL}/bet/history/${walletAddress}`, {
      params: { page, limit }
    });
    return response.data;
  },

  getRecentBets: async (limit = 10): Promise<BetHistory[]> => {
    const response = await axios.get(`${API_URL}/bet/recent`, {
      params: { limit }
    });
    return response.data;
  }
}; 