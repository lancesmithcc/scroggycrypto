/**
 * Mint ScroggyCoin on Solana Mainnet
 */

import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');

dotenv.config({ path: envPath });

const NETWORK = 'mainnet-beta'; // Using mainnet!
const TOTAL_SUPPLY = 1_000_000; // 1 million tokens

async function mintScroggyCoin() {
  console.log('🎰 SCROGGYCOIN MINTING SCRIPT 🎰');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Validate environment
  if (!process.env.SOLANA_PRIVATE_KEY) {
    console.error('❌ SOLANA_PRIVATE_KEY not found in .env');
    process.exit(1);
  }

  try {
    // Parse private key
    const privateKeyArray = JSON.parse(process.env.SOLANA_PRIVATE_KEY);
    const payer = Keypair.fromSecretKey(Uint8Array.from(privateKeyArray));

    console.log('📍 Network: MAINNET-BETA (Real Solana blockchain)');
    console.log('👛 Wallet:', payer.publicKey.toBase58());
    console.log('');

    // Connect to mainnet
    const connection = new Connection(clusterApiUrl(NETWORK), 'confirmed');

    // Check balance
    console.log('💰 Checking balance...');
    const balance = await connection.getBalance(payer.publicKey);
    const solBalance = balance / LAMPORTS_PER_SOL;
    console.log(`   Balance: ${solBalance.toFixed(4)} SOL`);

    if (balance < 0.003 * LAMPORTS_PER_SOL) {
      console.log('❌ Insufficient balance! Need at least 0.003 SOL');
      process.exit(1);
    }
    console.log('   ✅ Sufficient balance\n');

    // Create the token mint
    console.log('🔨 Creating ScroggyCoin token...');
    console.log('   (This will take 10-30 seconds)\n');

    const mint = await createMint(
      connection,
      payer,
      payer.publicKey, // mint authority
      payer.publicKey, // freeze authority
      0, // 0 decimals (whole tokens only)
      undefined,
      undefined,
      TOKEN_PROGRAM_ID
    );

    console.log('✅ Token created!');
    console.log('📍 Mint Address:', mint.toBase58());
    console.log('');

    // Create token account
    console.log('📦 Creating token account...');
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );
    console.log('✅ Token account created');
    console.log('📍 Account:', tokenAccount.address.toBase58());
    console.log('');

    // Mint tokens
    console.log(`💎 Minting ${TOTAL_SUPPLY.toLocaleString()} ScroggyCoins...`);
    const signature = await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer.publicKey,
      TOTAL_SUPPLY
    );

    console.log('✅ Tokens minted successfully!');
    console.log('📍 Transaction:', signature);
    console.log('');

    // Verify
    const accountInfo = await connection.getTokenAccountBalance(tokenAccount.address);
    console.log('✅ Verified supply:', accountInfo.value.amount, 'tokens');
    console.log('');

    // Update .env file
    console.log('💾 Updating .env file...');
    let envContent = readFileSync(envPath, 'utf8');
    
    if (envContent.includes('SCROGGYCOIN_MINT_ADDRESS=')) {
      envContent = envContent.replace(
        /SCROGGYCOIN_MINT_ADDRESS=.*/,
        `SCROGGYCOIN_MINT_ADDRESS=${mint.toBase58()}`
      );
    } else {
      envContent += `\n# ScroggyCoin Token\nSCROGGYCOIN_MINT_ADDRESS=${mint.toBase58()}\n`;
    }
    
    writeFileSync(envPath, envContent);
    console.log('✅ .env file updated');
    console.log('');

    // Final summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 SCROGGYCOIN SUCCESSFULLY CREATED! 🎉');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('Token Details:');
    console.log('  Name: ScroggyCoin');
    console.log('  Symbol: SCROGGY (utility token)');
    console.log('  Network: Solana Mainnet');
    console.log('  Total Supply: 1,000,000 tokens');
    console.log('  Decimals: 0 (whole tokens only)');
    console.log('');
    console.log('Addresses:');
    console.log('  Mint:', mint.toBase58());
    console.log('  Your Wallet:', payer.publicKey.toBase58());
    console.log('  Token Account:', tokenAccount.address.toBase58());
    console.log('');
    console.log('View on Explorer:');
    console.log('  https://explorer.solana.com/address/' + mint.toBase58());
    console.log('  https://solscan.io/token/' + mint.toBase58());
    console.log('');
    console.log('Transaction:');
    console.log('  https://explorer.solana.com/tx/' + signature);
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('✅ All 1,000,000 ScroggyCoins are now in your wallet!');
    console.log('✅ Your casino is blockchain-verified!');
    console.log('✅ Token address saved to .env');
    console.log('');
    console.log('Next steps:');
    console.log('  1. ✅ ScroggyCoin is minted and ready');
    console.log('  2. 🎮 Continue testing your casino');
    console.log('  3. 🚀 Deploy to Netlify when ready');
    console.log('');

  } catch (error) {
    console.error('\n❌ Error during minting:', error.message);
    if (error.logs) {
      console.error('Transaction logs:', error.logs);
    }
    process.exit(1);
  }
}

// Run it!
console.log('\n⚠️  WARNING: This will create a real token on Solana mainnet!');
console.log('💰 Cost: ~0.003 SOL (~$0.45)');
console.log('🔐 Network: MAINNET-BETA (Real blockchain)\n');
console.log('Starting in 3 seconds...\n');

setTimeout(() => {
  mintScroggyCoin();
}, 3000);

