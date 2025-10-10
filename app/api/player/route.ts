import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Player, INITIAL_BALANCE } from '@/lib/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const PLAYERS_FILE = path.join(DATA_DIR, 'players.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory already exists
  }
}

// Get all players
async function getAllPlayers(): Promise<Player[]> {
  try {
    const data = await fs.readFile(PLAYERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Save all players
async function saveAllPlayers(players: Player[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(PLAYERS_FILE, JSON.stringify(players, null, 2));
}

// GET - Get current player data
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await currentUser();
    const players = await getAllPlayers();
    let player = players.find(p => p.userId === userId);

    // Create new player if doesn't exist
    if (!player) {
      player = {
        userId,
        username: user?.username || user?.firstName || 'Player',
        balance: INITIAL_BALANCE,
        totalWins: 0,
        totalLosses: 0,
        biggestWin: 0,
        gamesPlayed: 0,
        createdAt: new Date().toISOString(),
        lastPlayed: new Date().toISOString(),
      };
      players.push(player);
      await saveAllPlayers(players);
    }

    return NextResponse.json(player);
  } catch (error) {
    console.error('Error getting player:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Update player data
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates = await request.json();
    const players = await getAllPlayers();
    const playerIndex = players.findIndex(p => p.userId === userId);

    if (playerIndex === -1) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    // Update player
    players[playerIndex] = {
      ...players[playerIndex],
      ...updates,
      lastPlayed: new Date().toISOString(),
    };

    await saveAllPlayers(players);

    return NextResponse.json(players[playerIndex]);
  } catch (error) {
    console.error('Error updating player:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

