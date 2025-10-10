import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { INITIAL_BALANCE } from '@/lib/types';
import { updatePlayerOnGitHub } from '@/lib/githubStorage';

// POST - Restart player with fresh 10 tokens
export async function POST() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Reset balance to 10 on GitHub, keep other stats
    const updatedPlayer = await updatePlayerOnGitHub(userId, {
      balance: INITIAL_BALANCE,
    });

    if (!updatedPlayer) {
      return NextResponse.json({ error: 'Player not found or update failed' }, { status: 404 });
    }

    return NextResponse.json(updatedPlayer);
  } catch (error) {
    console.error('Error restarting player:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

