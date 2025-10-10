import { SLOT_SYMBOLS, PAYOUT_TABLE, SpinResult } from './types';

/**
 * Generate random spin result
 */
export function generateSpinResult(): string[] {
  const symbols: string[] = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * SLOT_SYMBOLS.length);
    symbols.push(SLOT_SYMBOLS[randomIndex]);
  }
  return symbols;
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

