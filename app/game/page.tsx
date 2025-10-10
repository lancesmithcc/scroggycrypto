'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import SlotMachine from '@/components/SlotMachine';
import Leaderboard from '@/components/Leaderboard';
import PayoutTable from '@/components/PayoutTable';
import { Player } from '@/lib/types';
import { getCachedPlayer, cachePlayerData } from '@/lib/clientStorage';

export default function GamePage() {
  const { user } = useUser();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchPlayerData();
    }
  }, [user]);

  const fetchPlayerData = async () => {
    try {
      // Try to load from cache first for instant display
      if (user) {
        const cached = getCachedPlayer(user.id);
        if (cached) {
          setPlayer(cached);
          setLoading(false);
          // Continue to fetch from API in background to sync
        }
      }

      const response = await fetch('/api/player');
      if (response.ok) {
        const data = await response.json();
        setPlayer(data);
        // Cache the fresh data
        if (user) {
          cachePlayerData(data);
        }
      } else {
        setError('Failed to load player data');
      }
    } catch (err) {
      setError('Error loading player data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpin = async (betAmount: number) => {
    if (!player) return;
    
    try {
      // OPTIMISTIC UPDATE: Update balance immediately on client-side
      const optimisticBalance = player.balance - betAmount;
      setPlayer({
        ...player,
        balance: optimisticBalance,
      });

      // Make API call to GitHub (slow, but persistent)
      const response = await fetch('/api/spin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ betAmount }),
      });

      if (!response.ok) {
        // ROLLBACK on error
        setPlayer({
          ...player,
          balance: player.balance,
        });
        const error = await response.json();
        throw new Error(error.error || 'Spin failed');
      }

      const data = await response.json();
      
      // Update with actual data from server (includes win/loss calculations)
      setPlayer(data.player);
      
      // Cache the updated player data
      if (user) {
        cachePlayerData(data.player);
      }

      return data.result;
    } catch (err) {
      console.error('Spin error:', err);
      // Try to fetch fresh data on error
      fetchPlayerData();
      throw err;
    }
  };

  const handleRestart = async () => {
    try {
      const response = await fetch('/api/player/restart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPlayer(data);
        // Cache the restarted player data
        if (user) {
          cachePlayerData(data);
        }
      }
    } catch (err) {
      console.error('Restart error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin-slow">🎰</div>
          <p className="text-xl text-casino-gold">Loading casino...</p>
        </div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-casino-dark border-2 border-casino-red rounded-2xl p-8">
          <p className="text-xl text-casino-red mb-4">{error || 'Failed to load game'}</p>
          <button
            onClick={fetchPlayerData}
            className="bg-casino-gold text-casino-dark px-6 py-2 rounded-lg font-bold hover:bg-yellow-400"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-4 md:mb-8">
        <div className="flex items-center justify-between p-2 md:p-4">
          <Link href="/">
            <div className="flex items-center gap-1 md:gap-2 cursor-pointer hover:scale-105 transition-transform">
              <span className="text-4xl md:text-6xl lg:text-8xl">🧙‍♂️</span>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold text-casino-gold glow-gold">
                SCROGGY'S CASINO
              </h1>
            </div>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm text-gray-400">Welcome back</p>
              <p className="text-lg font-bold text-white">{player.username}</p>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MOBILE: 1st | DESKTOP: Center - Slot Machine */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <SlotMachine
              onSpin={handleSpin}
              balance={player.balance}
              disabled={player.balance < 1}
            />
            
            {player.balance < 1 && (
              <div className="mt-6 bg-casino-red/20 border-2 border-casino-red rounded-xl p-6 text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-5xl">💀</span>
                  <div>
                    <p className="text-casino-red font-bold text-2xl">
                      Out of Tokens!
                    </p>
                    <p className="text-gray-300 text-sm mt-1">
                      Your ScroggyCoins have vanished into the void
                    </p>
                  </div>
                  <span className="text-5xl">😈</span>
                </div>
                <button
                  onClick={handleRestart}
                  className="bg-gradient-to-r from-casino-gold to-yellow-500 text-casino-dark px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-casino-gold/50"
                >
                  🧙‍♂️ Start Fresh (10 Tokens)
                </button>
                <p className="text-xs text-gray-500 italic">
                  Scroggy the Wizard grants you another chance!
                </p>
              </div>
            )}
          </div>

          {/* MOBILE: 2nd | DESKTOP: Left - Payout Table & Stats */}
          <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            <PayoutTable />
            
            {/* Player Stats */}
            <div className="bg-casino-dark border-2 border-casino-gold rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-casino-gold mb-4 text-center glow-gold">
                📊 YOUR STATS
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Games Played:</span>
                  <span className="text-white font-bold">{player.gamesPlayed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Wins:</span>
                  <span className="text-green-400 font-bold">{player.totalWins}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Losses:</span>
                  <span className="text-red-400 font-bold">{player.totalLosses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Biggest Win:</span>
                  <span className="text-casino-gold font-bold">{player.biggestWin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Win Rate:</span>
                  <span className="text-white font-bold">
                    {player.gamesPlayed > 0
                      ? Math.round((player.totalWins / player.gamesPlayed) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE: 3rd | DESKTOP: Right - Leaderboard */}
          <div className="lg:col-span-1 order-3">
            <Leaderboard />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-8 text-center text-sm text-gray-500">
        <p>Powered by Blockchain Based ScroggyCoin utility tokens • For entertainment only • No real monetary value</p>
      </footer>
    </div>
  );
}

