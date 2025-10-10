/**
 * ScroggyCoin Token Minting Script
 * 
 * This script creates the ScroggyCoin token on Solana
 * Run this once to initialize the token
 * 
 * Usage:
 *   npx ts-node scripts/mint-token.ts
 */

import { initializeScroggyCoin } from '../lib/solana';

async function main() {
  try {
    console.log('🎰 Initializing ScroggyCoin...\n');
    
    await initializeScroggyCoin();
    
    console.log('\n✅ ScroggyCoin successfully created!');
    console.log('\n⚠️  IMPORTANT: Save the mint address in your .env file');
    console.log('Add this line: SCROGGYCOIN_MINT_ADDRESS=<the_mint_address_shown_above>');
    
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

main();

