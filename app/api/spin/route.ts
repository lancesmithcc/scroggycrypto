import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { generateSpinResult, calculatePayout, validateBet } from '@/lib/gameLogic';
import { MIN_BET, MAX_BET } from '@/lib/types';
import {
  getCurrentPlayerFromGitHub,
  updatePlayerOnGitHub,
} from '@/lib/githubStorage';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`[SPIN] User ${userId} spinning...`);

    const { betAmount } = await request.json();

    if (!betAmount || typeof betAmount !== 'number') {
      return NextResponse.json({ error: 'Invalid bet amount' }, { status: 400 });
    }

    // Get player data from GitHub
    const player = await getCurrentPlayerFromGitHub(userId);

    if (!player) {
      console.error(`[SPIN] Player not found for userId: ${userId}`);
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    // Verify player userId matches request userId (prevent mixups)
    if (player.userId !== userId) {
      console.error(`[SPIN] UserId mismatch! Expected: ${userId}, Got: ${player.userId}`);
      return NextResponse.json({ error: 'User verification failed' }, { status: 403 });
    }

    console.log(`[SPIN] User ${userId} balance before: ${player.balance}`);

    // Validate bet
    const validation = validateBet(betAmount, player.balance, MIN_BET, MAX_BET);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Generate spin result
    const symbols = generateSpinResult();
    const result = calculatePayout(symbols, betAmount);

    // Calculate new stats
    const newBalance = player.balance - betAmount + result.payout;
    const isWin = result.win;

    const updates = {
      balance: newBalance,
      totalWins: isWin ? player.totalWins + 1 : player.totalWins,
      totalLosses: isWin ? player.totalLosses : player.totalLosses + 1,
      biggestWin: Math.max(player.biggestWin, result.payout),
      gamesPlayed: player.gamesPlayed + 1,
    };

    // Update player on GitHub (with retry logic)
    let updatedPlayer = await updatePlayerOnGitHub(userId, updates);
    
    // Retry once if it fails (handles GitHub API rate limits/conflicts)
    if (!updatedPlayer) {
      console.warn(`[SPIN] First update failed, retrying for user ${userId}...`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms
      updatedPlayer = await updatePlayerOnGitHub(userId, updates);
    }

    if (!updatedPlayer) {
      console.error(`[SPIN] Failed to update player ${userId} after retry`);
      return NextResponse.json({ error: 'Failed to update player' }, { status: 500 });
    }

    console.log(`[SPIN] User ${userId} balance after: ${updatedPlayer.balance}`);

    // Double-check the returned player matches the request user
    if (updatedPlayer.userId !== userId) {
      console.error(`[SPIN] CRITICAL: Updated player userId mismatch! Expected: ${userId}, Got: ${updatedPlayer.userId}`);
      return NextResponse.json({ error: 'Data integrity error' }, { status: 500 });
    }

    // Return spin result
    return NextResponse.json({
      result,
      newBalance,
      player: updatedPlayer,
    });
  } catch (error) {
    console.error('[SPIN] Error processing spin:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

