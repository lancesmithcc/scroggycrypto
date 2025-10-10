import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { updatePlayerOnGitHub, getCurrentPlayerFromGitHub } from '@/lib/githubStorage';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { transactionSignature, amount } = await request.json();

    if (!transactionSignature || !amount) {
      return NextResponse.json({ error: 'Missing transaction data' }, { status: 400 });
    }

    console.log(`💰 Processing token purchase for user ${userId}`);
    console.log(`📝 Transaction: ${transactionSignature}`);
    console.log(`🪙 Amount: ${amount} tokens`);

    // Get current player data
    const player = await getCurrentPlayerFromGitHub(userId);

    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    // Add tokens to player balance
    const newBalance = player.balance + amount;

    console.log(`📊 Old balance: ${player.balance}, New balance: ${newBalance}`);

    // Update player on GitHub
    const updatedPlayer = await updatePlayerOnGitHub(userId, {
      balance: newBalance,
    });

    if (!updatedPlayer) {
      return NextResponse.json({ error: 'Failed to update balance' }, { status: 500 });
    }

    console.log(`✅ Token purchase complete for user ${userId}`);

    return NextResponse.json({
      success: true,
      newBalance: updatedPlayer.balance,
      transactionSignature,
      tokensAdded: amount,
    });
  } catch (error) {
    console.error('❌ Error processing token purchase:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

