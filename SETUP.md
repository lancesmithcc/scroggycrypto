# Scroggy's Casino - Setup Guide

## Quick Start Guide

Follow these steps to get Scroggy's Casino up and running:

### 1. Environment Variables Setup

You need to configure your `.env` file with the following keys:

```env
# Clerk Authentication Keys
# Get these from: https://clerk.com/
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Solana Wallet Address
# Your Solana wallet public address
SOLANA_ADDRESS=your_wallet_address_here

# Solana Private Key (for minting - keep secure!)
# Array format: [123,45,67,...]
SOLANA_PRIVATE_KEY=[your,private,key,array]

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Get Clerk API Keys

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Choose "Next.js" as your framework
4. Copy the publishable key to `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
5. Copy the secret key to `CLERK_SECRET_KEY`

### 3. Solana Wallet Setup

#### Option A: Use Existing Wallet
If you already have a Solana wallet:
1. Get your wallet's public address
2. Export your private key as a byte array
3. Add both to your `.env` file

#### Option B: Create New Wallet
```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Generate new keypair
solana-keygen new --outfile ~/.config/solana/scroggy-casino.json

# Get public address
solana-keygen pubkey ~/.config/solana/scroggy-casino.json

# Get private key (careful - keep this secure!)
cat ~/.config/solana/scroggy-casino.json
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Mint ScroggyCoin (One-Time Setup)

Before running the app, you need to create the ScroggyCoin token on Solana:

```bash
# Make sure you have SOL in your wallet for transaction fees
# On devnet: Use https://solfaucet.com/ to get test SOL

# Run the minting script
npx ts-node scripts/mint-token.ts
```

This will:
- Create the ScroggyCoin token
- Mint 1,000,000 tokens to your wallet
- Display the mint address (save this!)

Add the mint address to your `.env`:
```env
SCROGGYCOIN_MINT_ADDRESS=your_mint_address_here
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

### 7. Testing the Game

1. Click "Start Playing Now" on the landing page
2. Sign up with Clerk (use email or social login)
3. You'll automatically receive 10 ScroggyCoins
4. Start spinning and try to win!

## Deployment to Netlify

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Scroggy's Casino"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose your repository
4. Build settings are already configured in `netlify.toml`

### 3. Configure Environment Variables

In Netlify dashboard, go to: Site settings > Environment variables

Add all your `.env` variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `SOLANA_ADDRESS`
- `SOLANA_PRIVATE_KEY`
- `SCROGGYCOIN_MINT_ADDRESS`
- `NEXT_PUBLIC_APP_URL` (use your Netlify URL)

### 4. Deploy

Click "Deploy site" and wait for the build to complete!

## Troubleshooting

### Issue: "Unauthorized" error
**Solution**: Make sure your Clerk keys are correctly set in `.env`

### Issue: Slot machine won't spin
**Solution**: Check browser console for errors. Ensure API routes are working.

### Issue: Balance not updating
**Solution**: Check that the `data` directory has write permissions. On Netlify, this uses serverless functions.

### Issue: Token minting fails
**Solution**: 
- Ensure you have SOL in your wallet
- Check that your private key is correctly formatted
- Try on devnet first before mainnet

### Issue: Leaderboard not showing
**Solution**: The leaderboard only shows after at least one player has played a game.

## Development Tips

### File Structure
- Keep components under 500 lines
- Use TypeScript for type safety
- All game logic in `lib/gameLogic.ts`
- Blockchain functions in `lib/solana.ts`

### Adding Sound Effects

1. Add sound files to `public/sounds/`
2. Update the SlotMachine component to use `use-sound` hook
3. Add sound triggers for:
   - Spin start
   - Reel stop
   - Win celebration
   - Loss sound

Example:
```typescript
import useSound from 'use-sound';

const [playSpinSound] = useSound('/sounds/spin.mp3');
const [playWinSound] = useSound('/sounds/win.mp3');
```

### Customizing Emojis

Edit `lib/types.ts`:
```typescript
export const SLOT_SYMBOLS = ['🍒', '🍋', '🍊', '🍇', '🍉', '⭐', '💎', '7️⃣'];
```

### Adjusting Payouts

Edit `lib/types.ts` to modify the payout table multipliers.

## Security Notes

⚠️ **Important**:
- Never commit your `.env` file
- Keep private keys secure
- Use environment variables in production
- ScroggyCoins are utility tokens only - no real monetary value
- Clearly communicate non-transferable nature to users

## Support

For issues or questions:
1. Check the README.md
2. Review the code comments
3. Check Clerk documentation
4. Review Solana Web3.js docs

## Next Steps

Once your app is running:
1. Test all game mechanics thoroughly
2. Test on different devices and browsers
3. Monitor the leaderboard system
4. Consider adding sound effects
5. Add analytics (optional)
6. Promote your casino! 🎰

Happy coding and may the odds be ever in your favor! 🍀

