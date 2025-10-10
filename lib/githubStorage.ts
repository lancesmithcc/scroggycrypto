// GitHub-based storage for Netlify deployment
// Updates data/players.json and data/leaderboard.json via GitHub API

import { Player, LeaderboardEntry } from './types';

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'lancesmithcc';
const REPO_NAME = 'scroggycrypto';
const BRANCH = 'main';

interface GitHubFile {
  content: string;
  sha: string;
}

// Get file from GitHub
async function getGitHubFile(path: string): Promise<GitHubFile | null> {
  try {
    const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    
    const response = await fetch(
      `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`,
      {
        headers: {
          'Authorization': token ? `token ${token}` : '',
          'Accept': 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch ${path} from GitHub:`, response.status);
      return null;
    }

    const data = await response.json();
    
    return {
      content: Buffer.from(data.content, 'base64').toString('utf-8'),
      sha: data.sha,
    };
  } catch (error) {
    console.error(`Error fetching ${path} from GitHub:`, error);
    return null;
  }
}

// Update file on GitHub
async function updateGitHubFile(
  path: string,
  content: string,
  sha: string,
  message: string
): Promise<boolean> {
  try {
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      console.error('GitHub token not found - cannot update file');
      return false;
    }

    const response = await fetch(
      `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          content: Buffer.from(content).toString('base64'),
          sha,
          branch: BRANCH,
        }),
      }
    );

    if (!response.ok) {
      console.error(`Failed to update ${path} on GitHub:`, response.status, await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error updating ${path} on GitHub:`, error);
    return false;
  }
}

// Get all players from GitHub
export async function getAllPlayersFromGitHub(): Promise<Player[]> {
  const file = await getGitHubFile('data/players.json');
  
  if (!file) {
    return [];
  }

  try {
    const players = JSON.parse(file.content);
    return Array.isArray(players) ? players : [];
  } catch (error) {
    console.error('Error parsing players.json:', error);
    return [];
  }
}

// Save all players to GitHub
export async function saveAllPlayersToGitHub(players: Player[]): Promise<boolean> {
  const file = await getGitHubFile('data/players.json');
  
  if (!file) {
    console.error('Could not get current players.json SHA');
    return false;
  }

  const content = JSON.stringify(players, null, 2);
  const message = `🎰 Update player data - ${new Date().toISOString()}`;

  return await updateGitHubFile('data/players.json', content, file.sha, message);
}

// Get leaderboard from GitHub
export async function getLeaderboardFromGitHub(): Promise<LeaderboardEntry[]> {
  const file = await getGitHubFile('data/leaderboard.json');
  
  if (!file) {
    return [];
  }

  try {
    const leaderboard = JSON.parse(file.content);
    return Array.isArray(leaderboard) ? leaderboard : [];
  } catch (error) {
    console.error('Error parsing leaderboard.json:', error);
    return [];
  }
}

// Update leaderboard on GitHub
export async function updateLeaderboardOnGitHub(players: Player[]): Promise<boolean> {
  const file = await getGitHubFile('data/leaderboard.json');
  
  if (!file) {
    console.error('Could not get current leaderboard.json SHA');
    return false;
  }

  // Generate leaderboard from players
  const leaderboard: LeaderboardEntry[] = players
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 10)
    .map((player, index) => ({
      userId: player.userId,
      username: player.username,
      balance: player.balance,
      totalWins: player.totalWins,
      rank: index + 1,
    }));

  const content = JSON.stringify(leaderboard, null, 2);
  const message = `🏆 Update leaderboard - ${new Date().toISOString()}`;

  return await updateGitHubFile('data/leaderboard.json', content, file.sha, message);
}

// Get current player from GitHub
export async function getCurrentPlayerFromGitHub(userId: string): Promise<Player | null> {
  const players = await getAllPlayersFromGitHub();
  return players.find(p => p.userId === userId) || null;
}

// Update player on GitHub
export async function updatePlayerOnGitHub(userId: string, updates: Partial<Player>): Promise<Player | null> {
  const players = await getAllPlayersFromGitHub();
  const playerIndex = players.findIndex(p => p.userId === userId);

  if (playerIndex === -1) {
    return null;
  }

  players[playerIndex] = {
    ...players[playerIndex],
    ...updates,
    lastPlayed: new Date().toISOString(),
  };

  const success = await saveAllPlayersToGitHub(players);
  
  if (success) {
    // Also update leaderboard
    await updateLeaderboardOnGitHub(players);
    return players[playerIndex];
  }

  return null;
}

// Create new player on GitHub
export async function createPlayerOnGitHub(player: Player): Promise<Player | null> {
  const players = await getAllPlayersFromGitHub();
  
  // Check if player already exists
  if (players.find(p => p.userId === player.userId)) {
    return players.find(p => p.userId === player.userId) || null;
  }

  players.push(player);
  
  const success = await saveAllPlayersToGitHub(players);
  
  if (success) {
    await updateLeaderboardOnGitHub(players);
    return player;
  }

  return null;
}

