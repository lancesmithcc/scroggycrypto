'use client';

import { PAYOUT_TABLE } from '@/lib/types';

export default function PayoutTable() {
  const payouts = Object.entries(PAYOUT_TABLE);

  return (
    <div className="bg-casino-dark border-2 border-casino-gold rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-casino-gold mb-6 text-center glow-gold">
        💰 PAYOUT TABLE 💰
      </h2>

      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {payouts.map(([combo, info]) => (
          <div
            key={combo}
            className="flex items-center justify-between bg-casino-darker p-2 rounded-lg border border-casino-gold/30 hover:border-casino-gold/60 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{combo}</span>
              <span className="text-white font-medium text-sm">{info.name}</span>
            </div>
            <div className="text-right">
              <p className="text-casino-gold font-bold text-sm">{info.multiplier}x</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-casino-darker/50 rounded-lg border border-casino-gold/20">
        <p className="text-sm text-gray-400 text-center">
          💡 Match symbols to win! Higher multipliers for rarer combinations.
        </p>
      </div>
    </div>
  );
}

