# 🪙 ScroggyCoin Minting Guide

## Current Status

⚠️ **The actual ScroggyCoin token has NOT been minted yet on the Solana blockchain.**

### What This Means:

✅ **Good News**: Your casino works perfectly without it!
- The game uses an internal token system
- Stored in `data/players.json` locally
- All features work (spinning, winning, leaderboard)
- No blockchain fees needed

🔗 **Blockchain Integration**: Optional but authentic
- Creates real tokens on Solana
- Requires SOL for gas fees (~0.001 SOL)
- Makes your project blockchain-verified
- Professional touch for portfolio

## Do You Need to Mint the Token?

### ❌ You DON'T need to mint if:
- Just testing locally
- Building a demo/prototype
- Don't want blockchain costs
- Want to keep it simple

### ✅ You SHOULD mint if:
- Want authentic blockchain integration
- Planning to showcase on portfolio
- Want to learn Solana development
- Have SOL for gas fees
- Want the full Web3 experience

## How to Mint ScroggyCoin (Optional)

### Prerequisites

1. **Solana Wallet with SOL**
   - You need ~0.002-0.003 SOL for fees
   - Get test SOL from: https://solfaucet.com/ (devnet)
   - Or buy real SOL for mainnet

2. **Private Key**
   - Export from your Solana wallet
   - Format: Array of numbers [123, 45, 67, ...]

### Step-by-Step Process

#### Option 1: Using Devnet (Testing - Free SOL)

1. **Install Solana CLI** (if not already):
   ```bash
   sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
   ```

2. **Create/Use a Keypair**:
   ```bash
   # Create new keypair
   solana-keygen new --outfile ~/.config/solana/scroggy-casino.json
   
   # Get public address
   solana-keygen pubkey ~/.config/solana/scroggy-casino.json
   
   # Get private key (KEEP SECURE!)
   cat ~/.config/solana/scroggy-casino.json
   ```

3. **Get Test SOL** (Devnet):
   ```bash
   # Set to devnet
   solana config set --url https://api.devnet.solana.com
   
   # Airdrop test SOL
   solana airdrop 1
   ```

4. **Add to .env**:
   ```env
   SOLANA_PRIVATE_KEY=[your,private,key,array,here]
   ```

5. **Run Minting Script**:
   ```bash
   npm run mint-token
   ```

6. **Save the Mint Address**:
   The script will output something like:
   ```
   ScroggyCoin mint created: ABC123...XYZ
   ```
   
   Add to `.env`:
   ```env
   SCROGGYCOIN_MINT_ADDRESS=ABC123...XYZ
   ```

#### Option 2: Using Mainnet (Real - Costs Real SOL)

⚠️ **Warning**: This uses real money!

1. **Use your existing wallet**:
   - You have: `4D5g1PmgNksrznT7JGNbvBcmmeV5q92Xdc9mjT6SiKxX`
   - Need: Private key in array format
   - Cost: ~0.002-0.003 SOL (~$0.30-$0.50)

2. **Set to mainnet**:
   ```bash
   solana config set --url https://api.mainnet-beta.solana.com
   ```

3. **Check balance**:
   ```bash
   solana balance
   ```

4. **Update script** in `lib/solana.ts`:
   Change line:
   ```typescript
   const connection = getConnection('devnet'); // Change to 'mainnet-beta'
   ```

5. **Run minting**:
   ```bash
   npm run mint-token
   ```

## What the Minting Script Does

```typescript
1. Connects to Solana network
2. Creates a new token (ScroggyCoin)
3. Sets you as the mint authority
4. Mints 1,000,000 tokens to your wallet
5. Returns the mint address
```

## Costs Breakdown

### Devnet (Free):
- Token creation: 0 SOL (test)
- Minting: 0 SOL (test)
- Total: FREE ✅

### Mainnet (Real):
- Token creation: ~0.001 SOL
- Token account: ~0.002 SOL
- Minting: ~0.00001 SOL
- **Total: ~0.003 SOL ($0.40-$0.50)**

## After Minting

### What Changes:
1. You have real ScroggyCoin tokens on Solana
2. Verifiable on blockchain explorers
3. Can show mint address in your app
4. Can verify token supply on-chain

### What Stays the Same:
- Game mechanics work identically
- Internal balance system still used
- No need to modify game code
- Players don't interact with blockchain directly

## Viewing Your Token

After minting, view it on:

**Devnet**:
- https://explorer.solana.com/?cluster=devnet
- Search for your mint address

**Mainnet**:
- https://explorer.solana.com/
- https://solscan.io/
- Search for your mint address

## Current Setup

Your `.env` currently has:
```env
SOLANA_ADDRESS=4D5g1PmgNksrznT7JGNbvBcmmeV5q92Xdc9mjT6SiKxX
```

To mint, you need to add:
```env
SOLANA_PRIVATE_KEY=[your,array,here]
```

## Security Notes

⚠️ **IMPORTANT**:
- Never commit private keys to GitHub
- `.env` is in `.gitignore` (protected)
- Private keys = Full wallet access
- Keep backups of your private key
- Use devnet first to test

## Token Details

When minted, ScroggyCoin will have:
- **Name**: ScroggyCoin
- **Symbol**: SCROGGY (you can customize)
- **Decimals**: 0 (whole tokens only)
- **Supply**: 1,000,000
- **Type**: SPL Token (Solana standard)

## Do You Want to Mint Now?

### Quick Decision Guide:

**Just Testing/Demo?**
→ Skip minting, use internal system ✅

**Portfolio Project?**
→ Mint on devnet (free) 🎯

**Production App?**
→ Consider mainnet (costs SOL) 💎

**Learning Blockchain?**
→ Definitely mint on devnet! 📚

## Summary

Your casino is **fully functional without blockchain minting**. The internal token system works perfectly for development, testing, and even deployment.

Minting the actual token is:
- ✅ Optional
- 💰 Costs ~$0.40 on mainnet (free on devnet)
- 🎓 Great learning experience
- 🔐 Adds blockchain authenticity

**Current recommendation**: Keep using the internal system for now. If you want blockchain experience, mint on devnet for free practice!

---

**Questions? Check `SETUP.md` or the minting script in `scripts/mint-token.ts`**

