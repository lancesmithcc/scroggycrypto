'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LeaderboardEntry } from '@/lib/types';
import BuyTokens from './BuyTokens';

interface LeaderboardProps {
  onPurchaseComplete?: () => void;
}

export default function Leaderboard({ onPurchaseComplete }: LeaderboardProps = {}) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    
    // Play refresh sound
    if (typeof window !== 'undefined') {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Ascending tone sequence for refresh
      [600, 700, 800].forEach((freq, i) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.start();
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
          oscillator.stop(audioContext.currentTime + 0.1);
        }, i * 80);
      });
    }
    
    await fetchLeaderboard();
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
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

      <div className="mt-6 space-y-3">
        {/* Refresh Button */}
        <div className="text-center">
          <motion.button
            onClick={handleRefresh}
            disabled={isRefreshing}
            whileHover={{ scale: isRefreshing ? 1 : 1.05 }}
            whileTap={{ scale: isRefreshing ? 1 : 0.95 }}
            className="text-sm font-semibold text-casino-gold hover:text-yellow-400 transition-colors px-4 py-2 rounded-lg border border-casino-gold/30 hover:border-casino-gold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-casino-gold/10"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <motion.span
              animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: 'linear' }}
              className="inline-block mr-2"
            >
              🔄
            </motion.span>
            <span className="relative z-10">
              {isRefreshing ? 'Refreshing...' : 'Refresh Leaderboard'}
            </span>
          </motion.button>
        </div>

        {/* Buy Tokens Button */}
        <BuyTokens onPurchaseComplete={onPurchaseComplete || (() => {})} />
      </div>
    </div>
  );
}

