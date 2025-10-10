// Client-side storage utilities for Netlify deployment
// Uses localStorage as a fallback when serverless functions can't write to files

import { Player, INITIAL_BALANCE } from './types';

const PLAYERS_KEY = 'scroggy_players';
const CURRENT_USER_KEY = 'scroggy_current_user';

export function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// Get all players from localStorage
export function getAllPlayersLocal(): Player[] {
  if (!isLocalStorageAvailable()) return [];
  
  try {
    const data = localStorage.getItem(PLAYERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading players from localStorage:', error);
    return [];
  }
}

// Save all players to localStorage
export function saveAllPlayersLocal(players: Player[]): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
  } catch (error) {
    console.error('Error saving players to localStorage:', error);
  }
}

// Get current player
export function getCurrentPlayerLocal(userId: string, username: string): Player {
  const players = getAllPlayersLocal();
  let player = players.find(p => p.userId === userId);

  if (!player) {
    player = {
      userId,
      username,
      balance: INITIAL_BALANCE,
      totalWins: 0,
      totalLosses: 0,
      biggestWin: 0,
      gamesPlayed: 0,
      createdAt: new Date().toISOString(),
      lastPlayed: new Date().toISOString(),
    };
    players.push(player);
    saveAllPlayersLocal(players);
  }

  return player;
}

// Update player
export function updatePlayerLocal(userId: string, updates: Partial<Player>): Player | null {
  const players = getAllPlayersLocal();
  const playerIndex = players.findIndex(p => p.userId === userId);

  if (playerIndex === -1) return null;

  players[playerIndex] = {
    ...players[playerIndex],
    ...updates,
    lastPlayed: new Date().toISOString(),
  };

  saveAllPlayersLocal(players);
  return players[playerIndex];
}

// Get leaderboard
export function getLeaderboardLocal(): Player[] {
  const players = getAllPlayersLocal();
  return players
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 10);
}

// Reset player tokens
export function resetPlayerTokensLocal(userId: string): Player | null {
  return updatePlayerLocal(userId, { balance: INITIAL_BALANCE });
}

