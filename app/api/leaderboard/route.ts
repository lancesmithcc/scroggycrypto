import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Player, LeaderboardEntry } from '@/lib/types';

const PLAYERS_FILE = path.join(process.cwd(), 'data', 'players.json');
const LEADERBOARD_FILE = path.join(process.cwd(), 'data', 'leaderboard.json');

async function getAllPlayers(): Promise<Player[]> {
  try {
    const data = await fs.readFile(PLAYERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function GET() {
  try {
    const players = await getAllPlayers();
    
    // Sort players by balance (descending)
    const sortedPlayers = players
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 10); // Top 10 players

    // Create leaderboard entries
    const leaderboard: LeaderboardEntry[] = sortedPlayers.map((player, index) => ({
      userId: player.userId,
      username: player.username,
      balance: player.balance,
      totalWins: player.totalWins,
      rank: index + 1,
    }));

    // Save to leaderboard file
    await fs.writeFile(
      LEADERBOARD_FILE,
      JSON.stringify(
        {
          lastUpdated: new Date().toISOString(),
          entries: leaderboard,
        },
        null,
        2
      )
    );

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

