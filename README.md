# 🎰 Scroggy's Casino

An exciting emoji-based slot machine game powered by ScroggyCoin utility tokens on the Solana blockchain.

## Features

- 🎨 **Beautiful Emoji Slot Machine** - Colorful emoji reels with smooth animations
- 🪙 **ScroggyCoin Tokens** - Built on Solana blockchain (1,000,000 total supply)
- 🔐 **Secure Authentication** - Powered by Clerk
- 🏆 **Leaderboard System** - Compete to be the top token holder
- 📊 **Player Statistics** - Track your wins, losses, and biggest wins
- 🎵 **Sound Effects** - Immersive audio (coming soon)
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animation**: Framer Motion
- **Authentication**: Clerk
- **Blockchain**: Solana Web3.js
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Clerk account (for authentication)
- Solana wallet (for token management)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd scroggyscasino
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Solana Wallet
SOLANA_ADDRESS=your_solana_wallet_address
SOLANA_PRIVATE_KEY=your_solana_private_key

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Game Rules

### Starting Balance
- New players receive **10 ScroggyCoins** to start

### Betting
- Minimum bet: **1 token**
- Maximum bet: **10 tokens**

### Winning Combinations

| Combination | Name | Multiplier |
|------------|------|------------|
| 💎💎💎 | Triple Diamonds | 50x |
| 7️⃣7️⃣7️⃣ | Lucky Sevens | 40x |
| ⭐⭐⭐ | Triple Stars | 30x |
| 🍉🍉🍉 | Triple Watermelon | 20x |
| 🍇🍇🍇 | Triple Grapes | 15x |
| 🍊🍊🍊 | Triple Orange | 12x |
| 🍋🍋🍋 | Triple Lemon | 10x |
| 🍒🍒🍒 | Triple Cherry | 8x |
| 💎💎 | Double Diamonds | 5x |
| 7️⃣7️⃣ | Double Sevens | 4x |
| ⭐⭐ | Double Stars | 3x |
| 🍉🍉 | Double Watermelon | 2x |

### Token Economy
- **Non-Transferable**: ScroggyCoins are utility tokens that stay within the game
- **House Reset**: If you run out of tokens, they return to the house
- **Leaderboard**: The player with the highest balance gets honored on the leaderboard

## Solana Token Setup

### Creating ScroggyCoin

The token needs to be created once on the Solana blockchain. This is typically done using a separate script.

1. Ensure you have SOL in your wallet (for transaction fees)
2. The token will be minted with:
   - Total Supply: 1,000,000 tokens
   - Decimals: 0 (whole tokens only)
   - Mint Cost: ~0.001 SOL

See `lib/solana.ts` for token creation utilities.

## Deployment

### Netlify Deployment

1. Connect your repository to Netlify
2. Set up environment variables in Netlify dashboard
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy!

The app is optimized for Netlify with serverless functions for API routes.

## Project Structure

```
scroggyscasino/
├── app/
│   ├── api/          # API routes (player, spin, leaderboard)
│   ├── game/         # Game page
│   ├── layout.tsx    # Root layout with Clerk
│   ├── page.tsx      # Landing page
│   └── globals.css   # Global styles
├── components/
│   ├── SlotMachine.tsx    # Main slot machine component
│   ├── Leaderboard.tsx    # Leaderboard display
│   └── PayoutTable.tsx    # Payout information
├── lib/
│   ├── types.ts      # TypeScript types
│   ├── gameLogic.ts  # Game mechanics
│   └── solana.ts     # Solana blockchain utilities
├── data/
│   ├── players.json      # Player data storage
│   └── leaderboard.json  # Leaderboard data
└── public/
    └── sounds/       # Sound effects (to be added)
```

## Important Notes

⚠️ **Legal Disclaimer**: ScroggyCoins are utility tokens for entertainment purposes only. They have no monetary value and cannot be transferred outside the game.

## Development

### Code Style
- Keep files under 500 lines
- Use TypeScript for type safety
- Follow modular architecture
- Use Tailwind for styling

### Testing
Test all game mechanics before deployment:
- Spin functionality
- Balance updates
- Win calculations
- Leaderboard updates

## Contributing

This is a personal project. For issues or suggestions, please open an issue on GitHub.

## License

MIT License - See LICENSE file for details

## Acknowledgments

- Built with Next.js and Solana
- Emoji graphics from system fonts
- Authentication by Clerk
- Deployed on Netlify

---

**Have fun and spin responsibly!** 🎰✨

