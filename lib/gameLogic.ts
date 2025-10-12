import { SLOT_SYMBOLS, PAYOUT_TABLE, SpinResult } from './types';

const THREE_OF_A_KIND_CHANCE = 0.15;
const TWO_OF_A_KIND_CHANCE = 0.4; // cumulative with three-of-a-kind -> 55% chance of at least a pair

const SYMBOL_WEIGHTS: Record<string, number> = {
  '🤑': 1,
  '💩': 2,
  '🍆': 3,
  '🍑': 3,
  '☠️': 3,
  '🤡': 4,
  '🌈': 4,
  '😻': 4,
  '🌮': 5,
  '🍄': 5,
  '🧀': 6,
  '🚬': 6,
};

function pickWeightedSymbol(exclude: string[] = []): string {
  const entries = Object.entries(SYMBOL_WEIGHTS).filter(([symbol]) => !exclude.includes(symbol));
  const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = Math.random() * totalWeight;

  for (const [symbol, weight] of entries) {
    roll -= weight;
    if (roll <= 0) {
      return symbol;
    }
  }

  return entries[entries.length - 1][0];
}

/**
 * Generate random spin result
 */
export function generateSpinResult(): string[] {
  const roll = Math.random();

  if (roll < THREE_OF_A_KIND_CHANCE) {
    const symbol = pickWeightedSymbol();
    return [symbol, symbol, symbol];
  }

  if (roll < THREE_OF_A_KIND_CHANCE + TWO_OF_A_KIND_CHANCE) {
    const pairSymbol = pickWeightedSymbol();
    const thirdSymbol = pickWeightedSymbol([pairSymbol]);
    if (Math.random() < 0.5) {
      return [pairSymbol, pairSymbol, thirdSymbol];
    }
    return [thirdSymbol, pairSymbol, pairSymbol];
  }

  const first = pickWeightedSymbol();
  const second =
    Math.random() < 0.35 ? first : pickWeightedSymbol([first]);
  const thirdCandidates = [first, second, pickWeightedSymbol()];
  const third = Math.random() < 0.3
    ? thirdCandidates[Math.floor(Math.random() * 2)] // favour another match
    : thirdCandidates[2];

  return [first, second, third];
}

/**
 * Calculate payout for a spin result
 */
export function calculatePayout(symbols: string[], betAmount: number): SpinResult {
  // Check for three of a kind
  const threeOfAKind = symbols.join('');
  if (PAYOUT_TABLE[threeOfAKind]) {
    return {
      symbols,
      win: true,
      payout: betAmount * PAYOUT_TABLE[threeOfAKind].multiplier,
      winType: PAYOUT_TABLE[threeOfAKind].name,
    };
  }

  // Check for two of a kind (first two symbols match)
  const twoOfAKind = symbols.slice(0, 2).join('');
  if (symbols[0] === symbols[1] && PAYOUT_TABLE[twoOfAKind]) {
    return {
      symbols,
      win: true,
      payout: betAmount * PAYOUT_TABLE[twoOfAKind].multiplier,
      winType: PAYOUT_TABLE[twoOfAKind].name,
    };
  }

  const lastTwo = symbols.slice(1).join('');
  if (symbols[1] === symbols[2] && PAYOUT_TABLE[lastTwo]) {
    return {
      symbols,
      win: true,
      payout: betAmount * PAYOUT_TABLE[lastTwo].multiplier,
      winType: PAYOUT_TABLE[lastTwo].name,
    };
  }

  if (symbols[0] === symbols[2]) {
    return {
      symbols,
      win: true,
      payout: betAmount * 2,
      winType: 'Mirror Match',
    };
  }

  // No win
  return {
    symbols,
    win: false,
    payout: 0,
  };
}

/**
 * Validate bet amount
 */
export function validateBet(betAmount: number, balance: number, minBet: number, maxBet: number): {
  valid: boolean;
  error?: string;
} {
  if (betAmount < minBet) {
    return { valid: false, error: `Minimum bet is ${minBet} tokens` };
  }
  
  if (betAmount > maxBet) {
    return { valid: false, error: `Maximum bet is ${maxBet} tokens` };
  }
  
  if (betAmount > balance) {
    return { valid: false, error: 'Insufficient balance' };
  }
  
  return { valid: true };
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Generate unique game ID
 */
export function generateGameId(): string {
  return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
