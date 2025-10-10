/**
 * Check Solana wallet balance before minting
 */

import { Connection, Keypair, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';

async function checkWallet() {
  try {
    // Check if private key exists
    if (!process.env.SOLANA_PRIVATE_KEY) {
      console.error('❌ SOLANA_PRIVATE_KEY not found in .env file');
      process.exit(1);
    }

    console.log('🔍 Checking wallet status...\n');

    // Parse private key
    const privateKeyArray = JSON.parse(process.env.SOLANA_PRIVATE_KEY);
    const wallet = Keypair.fromSecretKey(Uint8Array.from(privateKeyArray));
    
    console.log('📍 Wallet Address:', wallet.publicKey.toBase58());
    console.log('');

    // Check both devnet and mainnet
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('DEVNET (Test Network - FREE)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const devnetConnection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    try {
      const devnetBalance = await devnetConnection.getBalance(wallet.publicKey);
      console.log('💰 Balance:', (devnetBalance / LAMPORTS_PER_SOL).toFixed(4), 'SOL');
      
      if (devnetBalance === 0) {
        console.log('');
        console.log('⚠️  No SOL in devnet wallet!');
        console.log('');
        console.log('To get FREE test SOL, run:');
        console.log('  solana config set --url https://api.devnet.solana.com');
        console.log('  solana airdrop 1', wallet.publicKey.toBase58());
        console.log('');
        console.log('Or use the web faucet:');
        console.log('  https://faucet.solana.com/');
      } else if (devnetBalance < 0.002 * LAMPORTS_PER_SOL) {
        console.log('⚠️  Low balance! You need at least 0.002 SOL to mint.');
        console.log('   Get more from: https://faucet.solana.com/');
      } else {
        console.log('✅ Sufficient balance to mint on DEVNET!');
      }
    } catch (error) {
      console.log('❌ Could not connect to devnet');
    }

    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('MAINNET (Real Network - COSTS REAL MONEY)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const mainnetConnection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    try {
      const mainnetBalance = await mainnetConnection.getBalance(wallet.publicKey);
      console.log('💰 Balance:', (mainnetBalance / LAMPORTS_PER_SOL).toFixed(4), 'SOL');
      console.log('💵 Value: ~$', ((mainnetBalance / LAMPORTS_PER_SOL) * 150).toFixed(2), 'USD (approximate)');
      
      if (mainnetBalance === 0) {
        console.log('⚠️  No SOL in mainnet wallet!');
      } else if (mainnetBalance < 0.003 * LAMPORTS_PER_SOL) {
        console.log('⚠️  Low balance! You need at least 0.003 SOL to mint.');
      } else {
        console.log('✅ Sufficient balance to mint on MAINNET!');
      }
    } catch (error) {
      console.log('❌ Could not connect to mainnet');
    }

    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('RECOMMENDATION');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('🎓 First time? → Use DEVNET (free)');
    console.log('🚀 Production ready? → Use MAINNET (costs SOL)');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Choose your network (devnet or mainnet)');
    console.log('  2. Make sure you have enough SOL');
    console.log('  3. Run: npm run mint-token');
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkWallet();

