import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { Player, INITIAL_BALANCE } from '@/lib/types';
import {
  getAllPlayersFromGitHub,
  createPlayerOnGitHub,
  getCurrentPlayerFromGitHub,
} from '@/lib/githubStorage';

// GET - Get current player data
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await currentUser();
    let player = await getCurrentPlayerFromGitHub(userId);

    // Create new player if doesn't exist
    if (!player) {
      const newPlayer: Player = {
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
      
      player = await createPlayerOnGitHub(newPlayer);
      
      if (!player) {
        return NextResponse.json({ error: 'Failed to create player' }, { status: 500 });
      }
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
    const { updatePlayerOnGitHub } = await import('@/lib/githubStorage');
    
    const updatedPlayer = await updatePlayerOnGitHub(userId, updates);

    if (!updatedPlayer) {
      return NextResponse.json({ error: 'Player not found or update failed' }, { status: 404 });
    }

    return NextResponse.json(updatedPlayer);
  } catch (error) {
    console.error('Error updating player:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

