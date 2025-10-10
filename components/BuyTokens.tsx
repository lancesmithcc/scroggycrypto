'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScroggyCoin from './ScroggyCoin';

interface BuyTokensProps {
  onPurchaseComplete: () => void;
}

export default function BuyTokens({ onPurchaseComplete }: BuyTokensProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [tokenAmount, setTokenAmount] = useState(100);

  const CASINO_WALLET = process.env.NEXT_PUBLIC_SOLANA_ADDRESS || '';
  const PRICE_PER_100_TOKENS = 0.005; // 0.005 SOL = 100 ScroggyCoins
  
  // Calculate SOL cost based on token amount
  const calculateCost = (tokens: number) => {
    return (tokens / 100) * PRICE_PER_100_TOKENS;
  };
  
  const solCost = calculateCost(tokenAmount);

  const handlePurchase = async () => {
    if (!window.solana || !window.solana.isPhantom) {
      setStatus('❌ Phantom Wallet not found! Install it from phantom.app');
      return;
    }

    if (!CASINO_WALLET) {
      setStatus('❌ Casino wallet not configured');
      return;
    }

    try {
      setIsPurchasing(true);
      setStatus('🔗 Connecting to Phantom...');

      // Connect to Phantom
      const resp = await window.solana.connect();
      const publicKey = resp.publicKey.toString();
      
      console.log('💰 Purchasing 100 ScroggyCoins from:', publicKey);
      setStatus('💸 Processing payment...');

      // Create transaction
      const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } = await import('@solana/web3.js');
      
      const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
      const connection = new Connection(rpcUrl);
      const lamports = Math.floor(solCost * LAMPORTS_PER_SOL);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(publicKey),
          toPubkey: new PublicKey(CASINO_WALLET),
          lamports,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey(publicKey);

      // Sign and send
      const signed = await window.solana.signAndSendTransaction(transaction);
      
      console.log('✅ Payment transaction:', signed.signature);
      setStatus('🎰 Adding tokens to your balance...');

      // Call API to add tokens
      const response = await fetch('/api/player/buy-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionSignature: signed.signature,
          amount: tokenAmount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add tokens');
      }

      const result = await response.json();
      
      setStatus(`✅ Success! You now have ${result.newBalance} ScroggyCoins!`);
      
      // Play success sound
      if (typeof window !== 'undefined') {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        [523, 659, 784, 1047].forEach((freq, i) => {
          setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
            oscillator.stop(audioContext.currentTime + 0.3);
          }, i * 100);
        });
      }

      // Notify parent to refresh player data
      onPurchaseComplete();

      setTimeout(() => {
        setIsOpen(false);
        setStatus('');
      }, 3000);

    } catch (error: any) {
      console.error('Purchase error:', error);
      setStatus(`❌ ${error.message || 'Purchase failed'}`);
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <>
      {/* Buy Tokens Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-sm font-semibold bg-gradient-to-r from-casino-gold to-yellow-500 text-casino-dark px-6 py-3 rounded-lg hover:from-yellow-500 hover:to-casino-gold transition-all shadow-lg hover:shadow-casino-gold/50 flex items-center justify-center gap-2 w-full relative overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
        <span className="relative z-10">
          <ScroggyCoin size={28} />
        </span>
        <span className="relative z-10">Buy ScroggyCoins</span>
      </motion.button>

      {/* Purchase Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-casino-dark border-4 border-casino-gold rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <ScroggyCoin size={80} />
                </motion.div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Buy ScroggyCoins</h2>
              <p className="text-gray-300 text-sm">
                Purchase in-game tokens with SOL!
              </p>
            </div>

            <div className="space-y-4">
              {/* Token Amount Input */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  How many ScroggyCoins?
                </label>
                <input
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(Math.max(10, parseInt(e.target.value) || 100))}
                  step="10"
                  min="10"
                  className="w-full bg-casino-darker border-2 border-casino-gold/30 rounded-lg px-4 py-3 text-white text-xl font-bold focus:border-casino-gold focus:outline-none"
                  disabled={isPurchasing}
                />
                {/* Preset Package Buttons */}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[
                    { tokens: 100, label: '100' },
                    { tokens: 250, label: '250' },
                    { tokens: 500, label: '500' },
                    { tokens: 1000, label: '1K' },
                  ].map((pkg) => (
                    <button
                      key={pkg.tokens}
                      onClick={() => setTokenAmount(pkg.tokens)}
                      className={`py-2 px-1 rounded-lg text-sm font-bold transition-all ${
                        tokenAmount === pkg.tokens
                          ? 'bg-casino-gold text-casino-dark'
                          : 'bg-casino-darker hover:bg-casino-gold/30 border border-casino-gold/30 hover:border-casino-gold text-white'
                      }`}
                      disabled={isPurchasing}
                    >
                      {pkg.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-gradient-to-r from-casino-gold/20 to-yellow-500/20 border-2 border-casino-gold rounded-xl p-6">
                <div className="text-center">
                  <p className="text-5xl font-bold text-casino-gold mb-2">{tokenAmount}</p>
                  <p className="text-white text-lg mb-3">ScroggyCoins</p>
                  <div className="flex items-center justify-center gap-2 text-2xl">
                    <span className="text-purple-400">☀️</span>
                    <span className="text-white font-bold">{solCost.toFixed(4)} SOL</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Rate: 0.005 SOL per 100 tokens
                  </p>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-casino-darker rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-lg">💰</span>
                  <p className="text-xs text-gray-300">
                    ScroggyCoins are in-game tokens only. They cannot be withdrawn or transferred.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">🎰</span>
                  <p className="text-xs text-gray-300">
                    Use tokens to play slots and climb the leaderboard!
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">🔒</span>
                  <p className="text-xs text-gray-300">
                    Payment goes to casino wallet to cover network fees.
                  </p>
                </div>
              </div>

              {/* Status Message */}
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/50 rounded-lg p-3 text-center text-sm text-white"
                >
                  {status}
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={handlePurchase}
                  disabled={isPurchasing || !CASINO_WALLET}
                  whileHover={{ scale: isPurchasing ? 1 : 1.02 }}
                  whileTap={{ scale: isPurchasing ? 1 : 0.98 }}
                  className="flex-1 bg-gradient-to-r from-casino-gold to-yellow-500 hover:from-yellow-400 hover:to-casino-gold text-casino-dark font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  {isPurchasing ? '⏳ Processing...' : '🪙 Buy Now'}
                </motion.button>
                
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    setStatus('');
                  }}
                  disabled={isPurchasing}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 bg-casino-darker hover:bg-casino-dark border-2 border-casino-gold/30 hover:border-casino-gold text-white font-semibold rounded-xl transition-all"
                >
                  Cancel
                </motion.button>
              </div>

              {/* Phantom Install Link */}
              <div className="text-center">
                <a
                  href="https://phantom.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-xs underline"
                >
                  Need Phantom Wallet? Get it here →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

