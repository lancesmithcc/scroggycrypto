import { NextResponse } from 'next/server';
import { getLeaderboardFromGitHub } from '@/lib/githubStorage';

export async function GET() {
  try {
    // Get leaderboard from GitHub
    const leaderboard = await getLeaderboardFromGitHub();

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

