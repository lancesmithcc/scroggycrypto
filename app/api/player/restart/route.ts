import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Player, INITIAL_BALANCE } from '@/lib/types';

const PLAYERS_FILE = path.join(process.cwd(), 'data', 'players.json');

async function getAllPlayers(): Promise<Player[]> {
  try {
    const data = await fs.readFile(PLAYERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveAllPlayers(players: Player[]): Promise<void> {
  await fs.writeFile(PLAYERS_FILE, JSON.stringify(players, null, 2));
}

// POST - Restart player with fresh 10 tokens
export async function POST() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await currentUser();
    const players = await getAllPlayers();
    const playerIndex = players.findIndex(p => p.userId === userId);

    if (playerIndex === -1) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    // Reset balance to 10, keep other stats
    players[playerIndex] = {
      ...players[playerIndex],
      balance: INITIAL_BALANCE,
      lastPlayed: new Date().toISOString(),
    };

    await saveAllPlayers(players);

    return NextResponse.json(players[playerIndex]);
  } catch (error) {
    console.error('Error restarting player:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

