// Game Types

export interface Player {
  userId: string;
  username: string;
  balance: number;
  totalWins: number;
  totalLosses: number;
  biggestWin: number;
  gamesPlayed: number;
  createdAt: string;
  lastPlayed: string;
}

export interface SpinResult {
  symbols: string[];
  win: boolean;
  payout: number;
  winType?: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  balance: number;
  totalWins: number;
  rank: number;
}

export interface GameConfig {
  initialBalance: number;
  minBet: number;
  maxBet: number;
  symbols: string[];
  payoutTable: PayoutTable;
}

export interface PayoutTable {
  [key: string]: {
    multiplier: number;
    name: string;
  };
}

export const SLOT_SYMBOLS = ['🤑', '💩', '🍆', '🍑', '🌈', '🌮', '🚬', '🤡', '😻', '☠️', '🧀', '🍄'];

export const INITIAL_BALANCE = 10;
export const MIN_BET = 1;
export const MAX_BET = 10;

// Payout table for different winning combinations
export const PAYOUT_TABLE: PayoutTable = {
  // Three of a kind
  '🤑🤑🤑': { multiplier: 50, name: 'Money Bags!' },
  '💩💩💩': { multiplier: 45, name: 'Holy Crap!' },
  '🍆🍆🍆': { multiplier: 40, name: 'Triple Eggplant' },
  '🍑🍑🍑': { multiplier: 35, name: 'Peachy Keen' },
  '☠️☠️☠️': { multiplier: 30, name: 'Dead Lucky' },
  '🤡🤡🤡': { multiplier: 25, name: 'Clown Fiesta' },
  '🌈🌈🌈': { multiplier: 20, name: 'Rainbow Riches' },
  '😻😻😻': { multiplier: 18, name: 'Cat\'s Meow' },
  '🌮🌮🌮': { multiplier: 15, name: 'Taco Tuesday' },
  '🍄🍄🍄': { multiplier: 12, name: 'Mushroom Power' },
  '🧀🧀🧀': { multiplier: 10, name: 'Big Cheese' },
  '🚬🚬🚬': { multiplier: 8, name: 'Smoking Hot' },
  
  // Two of a kind (first two)
  '🤑🤑': { multiplier: 5, name: 'Double Money' },
  '💩💩': { multiplier: 4, name: 'Double Trouble' },
  '🍆🍆': { multiplier: 4, name: 'Double Eggplant' },
  '🍑🍑': { multiplier: 3, name: 'Double Peach' },
  '☠️☠️': { multiplier: 3, name: 'Double Skull' },
};

