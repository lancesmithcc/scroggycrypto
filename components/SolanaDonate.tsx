'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SolanaDonate() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('0.1');
  const [status, setStatus] = useState<string>('');
  const [isDonating, setIsDonating] = useState(false);

  const CASINO_WALLET = process.env.NEXT_PUBLIC_SOLANA_ADDRESS || '';

  // Log wallet configuration on component mount
  if (typeof window !== 'undefined') {
    console.log('💰 Donation wallet configured:', CASINO_WALLET ? '✅ Yes' : '❌ No');
    if (CASINO_WALLET) {
      console.log('💰 Wallet address:', CASINO_WALLET);
    } else {
      console.warn('⚠️ NEXT_PUBLIC_SOLANA_ADDRESS not set - donations disabled');
    }
  }

  const handleDonate = async () => {
    if (!window.solana || !window.solana.isPhantom) {
      setStatus('❌ Phantom Wallet not found! Please install it from phantom.app');
      return;
    }

    try {
      setIsDonating(true);
      setStatus('🔗 Connecting to Phantom...');

      // Connect to Phantom
      const resp = await window.solana.connect();
      const publicKey = resp.publicKey.toString();
      
      console.log('Connected to wallet:', publicKey);
      setStatus('💰 Sending donation...');

      // Request transaction
      const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } = await import('@solana/web3.js');
      
      // Use custom RPC URL or default to devnet (free and no rate limits)
      // For production: Set NEXT_PUBLIC_SOLANA_RPC_URL to a paid RPC endpoint
      // (Helius, QuickNode, Alchemy - see SOLANA_RPC_SETUP.md)
      const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
      
      console.log('🔗 Using Solana RPC:', rpcUrl.includes('devnet') ? 'Devnet (testing)' : 'Mainnet/Custom');
      
      const connection = new Connection(rpcUrl);
      const lamports = Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL);

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

      // Sign and send transaction
      const signed = await window.solana.signAndSendTransaction(transaction);
      
      console.log('Transaction signature:', signed.signature);
      setStatus(`✅ Thank you! Donation sent: ${signed.signature.substring(0, 20)}...`);
      
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

      setTimeout(() => {
        setIsOpen(false);
        setStatus('');
      }, 5000);

    } catch (error: any) {
      console.error('Donation error:', error);
      setStatus(`❌ ${error.message || 'Transaction failed'}`);
    } finally {
      setIsDonating(false);
    }
  };

  return (
    <>
      {/* Floating Donate Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 left-8 z-40 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2 border-2 border-purple-400"
      >
        <span className="text-2xl">☀️</span>
        <span>Support Casino</span>
      </motion.button>

      {/* Donation Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-casino-dark border-4 border-purple-500 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">☀️</div>
              <h2 className="text-3xl font-bold text-white mb-2">Support Scroggy's Casino</h2>
              <p className="text-gray-300 text-sm">
                Help keep the casino running and pay for transaction fees!
              </p>
            </div>

            <div className="space-y-4">
              {/* Amount Input */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Donation Amount (SOL)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.01"
                  min="0.01"
                  className="w-full bg-casino-darker border-2 border-purple-500/30 rounded-lg px-4 py-3 text-white text-xl font-bold focus:border-purple-500 focus:outline-none"
                  disabled={isDonating}
                />
                <div className="flex gap-2 mt-2">
                  {['0.1', '0.5', '1.0'].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt)}
                      className="flex-1 bg-casino-darker hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-500 rounded-lg py-2 text-sm text-white transition-all"
                      disabled={isDonating}
                    >
                      {amt} SOL
                    </button>
                  ))}
                </div>
              </div>

              {/* Casino Wallet Address */}
              <div className={`rounded-lg p-3 ${CASINO_WALLET ? 'bg-casino-darker' : 'bg-red-900/20 border border-red-500/30'}`}>
                <p className="text-xs text-gray-400 mb-1">Casino Wallet:</p>
                {CASINO_WALLET ? (
                  <p className="text-xs text-purple-400 font-mono break-all">
                    {CASINO_WALLET}
                  </p>
                ) : (
                  <div className="space-y-1">
                    <p className="text-xs text-red-400 font-bold">
                      ⚠️ Not configured
                    </p>
                    <p className="text-xs text-gray-400">
                      Add NEXT_PUBLIC_SOLANA_ADDRESS to Netlify environment variables
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      See DONATION_SETUP.md for instructions
                    </p>
                  </div>
                )}
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
                  onClick={handleDonate}
                  disabled={isDonating || !CASINO_WALLET}
                  whileHover={{ scale: isDonating ? 1 : 1.02 }}
                  whileTap={{ scale: isDonating ? 1 : 0.98 }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  {isDonating ? '⏳ Processing...' : '☀️ Donate with Phantom'}
                </motion.button>
                
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    setStatus('');
                  }}
                  disabled={isDonating}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 bg-casino-darker hover:bg-casino-dark border-2 border-purple-500/30 hover:border-purple-500 text-white font-semibold rounded-xl transition-all"
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
                  Don't have Phantom? Get it here →
                </a>
              </div>

              {/* Info */}
              <div className="text-center text-xs text-gray-500">
                <p>Your donation helps cover Solana network fees</p>
                <p>and keeps the casino running! 🙏</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

