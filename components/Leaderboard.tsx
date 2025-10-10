'use client';

import { useEffect, useState } from 'react';
import { LeaderboardEntry } from '@/lib/types';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  if (loading) {
    return (
      <div className="bg-casino-dark border-2 border-casino-gold rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-casino-gold mb-4 text-center glow-gold">
          🏆 LEADERBOARD 🏆
        </h2>
        <p className="text-center text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-casino-dark border-2 border-casino-gold rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-casino-gold mb-6 text-center glow-gold">
        🏆 LEADERBOARD 🏆
      </h2>

      {leaderboard.length === 0 ? (
        <p className="text-center text-gray-400 py-8">
          No players yet. Be the first to play!
        </p>
      ) : (
        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div
              key={entry.userId}
              className={`
                flex items-center justify-between p-4 rounded-xl
                ${entry.rank === 1
                  ? 'bg-gradient-to-r from-yellow-600/30 to-yellow-800/30 border-2 border-yellow-500'
                  : 'bg-casino-darker border border-casino-gold/30'
                }
              `}
            >
              <div className="flex items-center gap-4 flex-1">
                <span className="text-3xl">{getMedalEmoji(entry.rank)}</span>
                <div className="flex-1">
                  <p className="font-bold text-white">
                    {entry.username}
                    {entry.rank === 1 && (
                      <span className="ml-2 text-xs bg-casino-gold text-casino-dark px-2 py-1 rounded-full">
                        TOP PLAYER
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-400">
                    {entry.totalWins} wins
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-casino-gold">
                  {entry.balance}
                </p>
                <p className="text-xs text-gray-400">tokens</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={fetchLeaderboard}
          className="text-sm text-casino-gold hover:text-yellow-400 transition-colors"
        >
          🔄 Refresh Leaderboard
        </button>
      </div>
    </div>
  );
}

