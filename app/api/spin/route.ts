import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { generateSpinResult, calculatePayout, validateBet } from '@/lib/gameLogic';
import { Player, MIN_BET, MAX_BET } from '@/lib/types';

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

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { betAmount } = await request.json();

    if (!betAmount || typeof betAmount !== 'number') {
      return NextResponse.json({ error: 'Invalid bet amount' }, { status: 400 });
    }

    // Get player data
    const players = await getAllPlayers();
    const playerIndex = players.findIndex(p => p.userId === userId);

    if (playerIndex === -1) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    const player = players[playerIndex];

    // Validate bet
    const validation = validateBet(betAmount, player.balance, MIN_BET, MAX_BET);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Generate spin result
    const symbols = generateSpinResult();
    const result = calculatePayout(symbols, betAmount);

    // Update player balance and stats
    const newBalance = player.balance - betAmount + result.payout;
    const isWin = result.win;

    players[playerIndex] = {
      ...player,
      balance: newBalance,
      totalWins: isWin ? player.totalWins + 1 : player.totalWins,
      totalLosses: isWin ? player.totalLosses : player.totalLosses + 1,
      biggestWin: Math.max(player.biggestWin, result.payout),
      gamesPlayed: player.gamesPlayed + 1,
      lastPlayed: new Date().toISOString(),
    };

    await saveAllPlayers(players);

    // Return spin result
    return NextResponse.json({
      result,
      newBalance,
      player: players[playerIndex],
    });
  } catch (error) {
    console.error('Error processing spin:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

