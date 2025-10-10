# 🎰 Quick Start - Scroggy's Casino

## Get Running in 5 Minutes

### Step 1: Install Dependencies (1 min)
```bash
cd /Users/lancesmithcc/scroggyscasino
npm install
```

### Step 2: Get Clerk Keys (2 min)
1. Go to https://clerk.com and sign up
2. Create a new application
3. Copy your keys

### Step 3: Create .env File (1 min)
Create a `.env` file in the project root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here
SOLANA_ADDRESS=your_solana_address
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Run Development Server (1 min)
```bash
npm run dev
```

### Step 5: Open Browser
Navigate to http://localhost:3000

🎉 **That's it! You're running Scroggy's Casino!**

## What You Can Do Now

✅ **Sign Up** - Click "Start Playing Now" and create an account
✅ **Get Tokens** - Automatically receive 10 ScroggyCoins
✅ **Play Slots** - Spin the emoji reels
✅ **Win Prizes** - Match symbols for big wins
✅ **Check Leaderboard** - See top players

## Game Controls

- **Bet Amount**: Use +/- buttons (1-10 tokens)
- **Spin**: Click the big "SPIN" button
- **Balance**: Shows your current tokens
- **Stats**: View your wins, losses, and win rate

## Winning Combinations

🎯 **Best Wins**:
- 💎💎💎 = 50x your bet
- 7️⃣7️⃣7️⃣ = 40x your bet
- ⭐⭐⭐ = 30x your bet

💰 **Good Wins**:
- 🍉🍉🍉 = 20x
- 🍇🍇🍇 = 15x
- 🍊🍊🍊 = 12x

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Check for linting errors
npm run type-check      # TypeScript type checking

# Token Management (Advanced)
npm run mint-token      # Create ScroggyCoin on Solana
```

## File Structure Overview

```
app/
  ├── page.tsx          # Landing page
  ├── game/page.tsx     # Main game
  └── api/              # Backend APIs

components/
  ├── SlotMachine.tsx   # Slot machine UI
  ├── Leaderboard.tsx   # Top players
  └── PayoutTable.tsx   # Win table

lib/
  ├── gameLogic.ts      # Game rules
  └── types.ts          # Game config
```

## Troubleshooting

### Can't sign in?
- Check your Clerk keys in `.env`
- Make sure you created the Clerk app

### Slot won't spin?
- Check browser console for errors
- Verify you have enough balance

### No leaderboard showing?
- Play at least one game first
- Refresh the leaderboard

## Next Steps

1. ✅ Play some games and test the features
2. 📝 Read `SETUP.md` for full setup guide
3. 🚀 Read `README.md` for complete documentation
4. 🎨 Customize emojis in `lib/types.ts`
5. 🎵 Add sound effects to `public/sounds/`
6. 🌐 Deploy to Netlify (see `README.md`)

## Need Help?

- **Full Setup**: See `SETUP.md`
- **Documentation**: See `README.md`
- **Project Details**: See `PROJECT_SUMMARY.md`
- **Tasks Completed**: See `tasks.md`

## Key Features

✨ **What's Included**:
- Clerk authentication
- Emoji slot machine
- Win/loss tracking
- Player statistics
- Leaderboard system
- Responsive design
- Beautiful animations
- Netlify-ready deployment

## Important Notes

⚠️ **Remember**:
- ScroggyCoins are for fun only
- No real money involved
- Tokens are non-transferable
- Keep your `.env` file secret
- Never commit sensitive keys

---

**Ready to Win Big?** 🎰

Start spinning and may the emojis be in your favor! 🍀

For detailed information, check out the other documentation files.

