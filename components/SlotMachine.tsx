'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SLOT_SYMBOLS } from '@/lib/types';
import SoundGenerator, { getSoundGenerator } from '@/lib/soundUtils';
import { getRandomLossComment, getRandomWinComment, type CharacterComment } from '@/lib/characterComments';

interface SlotMachineProps {
  onSpin: (betAmount: number) => Promise<{
    symbols: string[];
    win: boolean;
    payout: number;
    winType?: string;
  }>;
  balance: number;
  disabled?: boolean;
}

export default function SlotMachine({ onSpin, balance, disabled = false }: SlotMachineProps) {
  const [reels, setReels] = useState<string[]>(['🎰', '🎰', '🎰']);
  const [spinning, setSpinning] = useState(false);
  const [spinningReels, setSpinningReels] = useState<boolean[]>([false, false, false]);
  const [betAmount, setBetAmount] = useState(1);
  const [lastWin, setLastWin] = useState<{
    payout: number;
    winType?: string;
  } | null>(null);
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundGenerator, setSoundGenerator] = useState<SoundGenerator | null>(null);
  const [characterComment, setCharacterComment] = useState<CharacterComment | null>(null);
  const [reelSymbols, setReelSymbols] = useState<string[][]>([
    [...SLOT_SYMBOLS],
    [...SLOT_SYMBOLS],
    [...SLOT_SYMBOLS]
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const generator = getSoundGenerator();
    setSoundGenerator(generator);

    const unlockOnInteraction = () => {
      generator.unlock().catch(() => {});
    };

    window.addEventListener('pointerdown', unlockOnInteraction, { once: true });
    window.addEventListener('touchstart', unlockOnInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockOnInteraction);
      window.removeEventListener('touchstart', unlockOnInteraction);
    };
  }, []);

  const toggleSound = async () => {
    if (!soundGenerator) {
      setSoundEnabled(prev => !prev);
      return;
    }

    const newState = !soundEnabled;
    setSoundEnabled(newState);
    // Ensure the generator knows about new state
    soundGenerator.setEnabled(true);

    if (newState) {
      await soundGenerator.unlock();
      soundGenerator.playToggleSound(true);
    } else {
      soundGenerator.playToggleSound(false);
    }

    soundGenerator.setEnabled(newState);
  };

  const handleSpin = async () => {
    if (spinning || disabled || betAmount > balance) return;

    if (soundGenerator) {
      await soundGenerator.unlock();
      soundGenerator.playClickSound();
    }

    setSpinning(true);
    setSpinningReels([true, true, true]);
    setLastWin(null);
    setShowWinAnimation(false);

    // Play spin sound
    if (soundGenerator && soundEnabled) {
      soundGenerator.playSpinSound();
    }

    // Animate each reel independently by cycling through symbols
    const reelIntervals: ReturnType<typeof setInterval>[] = [];
    
    // Start all reels spinning - cycle through random symbols
    for (let i = 0; i < 3; i++) {
      const interval = setInterval(() => {
        setReels(prev => {
          const newReels = [...prev];
          // Show random symbol while spinning
          newReels[i] = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
          return newReels;
        });
      }, 80); // Changed to 80ms for better visibility
      reelIntervals.push(interval);
    }

    try {
      // Call the spin API
      const result = await onSpin(betAmount);

      // Stop reels one by one (left to right) for realistic effect
      const stopReel = (reelIndex: number, symbol: string, delay: number) => {
        setTimeout(() => {
          clearInterval(reelIntervals[reelIndex]);
          setReels(prev => {
            const newReels = [...prev];
            newReels[reelIndex] = symbol;
            return newReels;
          });
          setSpinningReels(prev => {
            const newSpinning = [...prev];
            newSpinning[reelIndex] = false;
            return newSpinning;
          });
          
          // Click sound when reel stops
          if (soundGenerator && soundEnabled) {
            soundGenerator.playClickSound();
          }
        }, delay);
      };

      // Stop reels sequentially: 1.5s, 2s, 2.5s
      stopReel(0, result.symbols[0], 1500);
      stopReel(1, result.symbols[1], 2000);
      stopReel(2, result.symbols[2], 2500);

      // Process result after all reels stop
      setTimeout(() => {
        setSpinning(false);

        if (result.win) {
          setLastWin({
            payout: result.payout,
            winType: result.winType,
          });
          setShowWinAnimation(true);
          
          // Show win comment
          const comment = getRandomWinComment(result.payout, betAmount);
          setCharacterComment(comment);
          
          // Play win sound
          if (soundGenerator && soundEnabled) {
            if (result.payout >= betAmount * 20) {
              soundGenerator.playBigWinSound();
            } else {
              soundGenerator.playWinSound();
            }
          }
          
          setTimeout(() => {
            setShowWinAnimation(false);
            setCharacterComment(null);
          }, 4000);
        } else {
          // Play loss sound
          if (soundGenerator && soundEnabled) {
            soundGenerator.playLossSound();
          }
          
          // Show loss comment
          const comment = getRandomLossComment(betAmount);
          setCharacterComment(comment);
          setTimeout(() => setCharacterComment(null), 3000);
        }
      }, 2600); // Slightly after last reel stops
    } catch (error) {
      console.error('Spin error:', error);
      reelIntervals.forEach(interval => clearInterval(interval));
      setSpinning(false);
      setSpinningReels([false, false, false]);
      soundGenerator?.playErrorSound();
    }
  };

  const increaseBet = () => {
    if (betAmount < 10 && betAmount < balance) {
      setBetAmount(betAmount + 1);
      if (soundGenerator && soundEnabled) {
        soundGenerator.playAdjustUpSound();
      }
    }
  };

  const decreaseBet = () => {
    if (betAmount > 1) {
      setBetAmount(betAmount - 1);
      if (soundGenerator && soundEnabled) {
        soundGenerator.playAdjustDownSound();
      }
    }
  };

  return (
    <div className="relative">
      {/* Character with Speech Bubble - Bottom Right */}
      <AnimatePresence>
        {characterComment && (
          <motion.div
            initial={{ x: 200, y: 200, opacity: 0, scale: 0.5 }}
            animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            exit={{ x: 200, y: 200, opacity: 0, scale: 0.5 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              duration: 0.5
            }}
            className="fixed bottom-8 right-8 z-50 flex items-end gap-4"
          >
            {/* Speech Bubble */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative bg-white text-casino-dark rounded-2xl px-6 py-4 shadow-2xl max-w-xs"
            >
              {/* Speech bubble pointer */}
              <div className="absolute bottom-4 -right-3 w-0 h-0 border-t-[15px] border-t-transparent border-l-[20px] border-l-white border-b-[15px] border-b-transparent"></div>
              
              <p className="text-lg font-bold italic leading-tight">
                "{characterComment.comment}"
              </p>
            </motion.div>

            {/* Character */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                y: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }
              }}
              className="text-8xl drop-shadow-2xl"
            >
              {characterComment.character}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slot Machine Display */}
      <div className="bg-gradient-to-b to-casino-dark backdrop-blur-sm bg-casino-dark/70  border-4 border-casino-gold rounded-3xl p-8 shadow-2xl">
        {/* Title and Sound Toggle */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl animate-pulse">✨</span>
            <span className="text-5xl animate-pulse">🧙‍♂️</span> 
            <span className="text-5xl animate-pulse">✨</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={toggleSound}
              className="px-4 py-2 bg-casino-dark/50 hover:bg-casino-dark border border-casino-gold/30 hover:border-casino-gold rounded-lg transition-all flex items-center gap-2 text-sm"
              title={soundEnabled ? 'Sound ON' : 'Sound OFF'}
            >
              <span className="text-xl">{soundEnabled ? '🔊' : '🔇'}</span>
              <span className="text-white">{soundEnabled ? 'Sound ON' : 'Sound OFF'}</span>
            </button>
          </div>
        </div>

        {/* Reels Container */}
        <div className="bg-casino-darker rounded-2xl p-6 mb-6 border-2 border-casino-gold/50 shadow-inner">
          <div className="flex justify-center gap-4">
            {reels.map((symbol, index) => (
              <div 
                key={index}
                className="relative w-36 h-40 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border-4 border-casino-gold shadow-2xl overflow-hidden"
              >
                {/* Top/Bottom shadows for depth */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
                
                {/* Center viewing window */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`
                    w-full h-32 bg-white flex items-center justify-center
                    ${showWinAnimation && !spinningReels[index] ? 'win-animation' : ''}
                    transition-all duration-200
                  `}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={symbol}
                        initial={spinningReels[index] ? false : { scale: 0.5, opacity: 0 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1,
                          filter: spinningReels[index] ? "blur(2px)" : "blur(0px)"
                        }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ 
                          duration: spinningReels[index] ? 0.05 : 0.3,
                          ease: "easeOut"
                        }}
                        className="text-6xl select-none"
                      >
                        {symbol}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Spinning indicator */}
                {spinningReels[index] && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-casino-gold/10 via-transparent to-casino-gold/10 pointer-events-none"
                      animate={{ y: [-200, 200] }}
                      transition={{ 
                        duration: 0.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    {/* Spinning speed lines */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute w-full h-1 bg-white top-1/4 blur-sm" />
                      <div className="absolute w-full h-1 bg-white top-2/4 blur-sm" />
                      <div className="absolute w-full h-1 bg-white top-3/4 blur-sm" />
                    </div>
                  </>
                )}
                
                {/* Reel number indicator */}
                <div className="absolute top-1 left-1 bg-casino-dark/80 rounded px-2 py-1 z-20">
                  <span className="text-xs text-casino-gold font-bold">{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Win Display */}
        <AnimatePresence>
          {lastWin && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-center mb-6 bg-casino-gold/20 rounded-xl p-4 border-2 border-casino-gold"
            >
              <p className="text-3xl font-bold text-casino-gold glow-gold">
                🎉 {lastWin.winType} 🎉
              </p>
              <p className="text-2xl font-bold text-white mt-2">
                Won {lastWin.payout} tokens!
              </p>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Bet Controls */}
        <div className="bg-casino-darker rounded-xl p-4 mb-4 border-2 border-casino-gold/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-bold">Bet Amount:</span>
            <div className="flex items-center gap-4">
              <button
                onClick={decreaseBet}
                disabled={spinning || betAmount <= 1}
                className="w-10 h-10 bg-casino-red hover:bg-red-600 disabled:bg-gray-600 text-white rounded-lg font-bold text-xl transition-colors"
              >
                -
              </button>
              <span className="text-3xl font-bold text-casino-gold w-16 text-center">
                {betAmount}
              </span>
              <button
                onClick={increaseBet}
                disabled={spinning || betAmount >= 10 || betAmount >= balance}
                className="w-10 h-10 bg-casino-green hover:bg-green-600 disabled:bg-gray-600 text-white rounded-lg font-bold text-xl transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-400">
            Potential Win: {betAmount * 50} tokens (max)
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={handleSpin}
          disabled={spinning || disabled || betAmount > balance}
          className={`
            w-full py-6 rounded-2xl font-bold text-2xl transition-all duration-200
            ${spinning || disabled || betAmount > balance
              ? 'bg-gray-600 cursor-not-allowed text-gray-400'
              : 'bg-gradient-to-r from-casino-gold to-yellow-500 hover:scale-105 text-casino-dark shadow-lg hover:shadow-casino-gold/50'
            }
          `}
        >
          {spinning ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                🎰
              </motion.span>
              SPINNING...
            </span>
          ) : betAmount > balance ? (
            'INSUFFICIENT BALANCE'
          ) : (
            '🎰 SPIN 🎰'
          )}
        </button>

        {/* Balance Display */}
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Your Balance</p>
          <p className="text-3xl font-bold text-casino-gold">
            {balance} tokens
          </p>
        </div>
      </div>
    </div>
  );
}
