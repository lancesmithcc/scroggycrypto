import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Logo / Title with Scroggy the Wizard */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-8xl animate-bounce-slow">🧙‍♂️</span>
          </div>
          <h1 className="text-7xl font-extrabold glow-gold animate-pulse-fast">
            Scroggy&apos;s Casino
          </h1>
          <p className="text-2xl text-casino-gold font-semibold">
            Where Magic Meets Fortune! 🎰✨
          </p>
          <p className="text-lg text-gray-400 italic">
            Hosted by Scroggy the Wizard
          </p>
        </div>

        {/* Description */}
        <div className="bg-casino-darker/50 backdrop-blur-sm border-2 border-casino-gold rounded-2xl p-8 space-y-4 shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">🧙‍♂️</span>
            <p className="text-xl text-gray-300 italic">
              &quot;Step into my magical casino and test your luck!&quot;
            </p>
            <span className="text-4xl">✨</span>
          </div>
          <p className="text-xl text-gray-300 font-semibold">
            Welcome to the most enchanting emoji-based slot machine on the blockchain!
          </p>
          <p className="text-lg text-gray-400">
            Powered by <span className="text-casino-gold font-bold">ScroggyCoin</span> utility tokens
          </p>
          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-casino-gold">10</p>
              <p className="text-sm text-gray-400">Starting Tokens</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-casino-red">🎲</p>
              <p className="text-sm text-gray-400">Pure Fun</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-casino-green">🏆</p>
              <p className="text-sm text-gray-400">Leaderboard Fame</p>
            </div>
          </div>
        </div>

        {/* Auth Section */}
        <div className="space-y-4">
          <SignedOut>
            <div className="space-y-4">
              <p className="text-xl text-gray-300">Ready to play?</p>
              <SignInButton mode="modal">
                <button className="bg-gradient-to-r from-casino-red to-casino-gold text-white px-12 py-4 rounded-full text-xl font-bold hover:scale-110 transform transition-all duration-200 shadow-lg hover:shadow-casino-gold/50">
                  🎰 Start Playing Now!
                </button>
              </SignInButton>
            </div>
          </SignedOut>
          
          <SignedIn>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <UserButton afterSignOutUrl="/" />
                <p className="text-xl text-gray-300">Welcome back!</p>
              </div>
              <Link href="/game">
                <button className="bg-gradient-to-r from-casino-red to-casino-gold text-white px-12 py-4 rounded-full text-xl font-bold hover:scale-110 transform transition-all duration-200 shadow-lg hover:shadow-casino-gold/50">
                  🎰 Enter Casino
                </button>
              </Link>
            </div>
          </SignedIn>
        </div>

        {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="bg-casino-dark/50 backdrop-blur-sm border border-casino-gold/30 rounded-xl p-6">
            <div className="text-4xl mb-3">🤡💩🍆</div>
            <h3 className="text-xl font-bold text-casino-gold mb-2">Wild Emoji Slots</h3>
            <p className="text-gray-400">Hilariously random symbols with crazy combinations</p>
          </div>
          <div className="bg-casino-dark/50 backdrop-blur-sm border border-casino-gold/30 rounded-xl p-6">
            <div className="text-4xl mb-3">🔊</div>
            <h3 className="text-xl font-bold text-casino-gold mb-2">Sound Effects</h3>
            <p className="text-gray-400">Immersive audio for every spin and win</p>
          </div>
          <div className="bg-casino-dark/50 backdrop-blur-sm border border-casino-gold/30 rounded-xl p-6">
            <div className="text-4xl mb-3">🏅</div>
            <h3 className="text-xl font-bold text-casino-gold mb-2">Leaderboard</h3>
            <p className="text-gray-400">Compete to be the top token holder</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-8 text-sm text-gray-500">
          <p>ScroggyCoin are blockchain utility tokens for entertainment purposes only.</p>
          <p>Tokens are non-transferable and have no monetary value.</p>
        </div>
      </div>
    </main>
  );
}

