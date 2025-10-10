/**
 * Convert base58 private key to array format
 */

import bs58 from 'bs58';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

console.log('🔄 Converting private key format...\n');

if (!process.env.SOLANA_PRIVATE_KEY) {
  console.log('❌ SOLANA_PRIVATE_KEY not found in .env file');
  process.exit(1);
}

const keyString = process.env.SOLANA_PRIVATE_KEY;

// Check if already in array format
if (keyString.startsWith('[')) {
  console.log('✅ Private key is already in array format!');
  console.log('   Run "npm run check-wallet" to proceed');
  process.exit(0);
}

try {
  console.log('📝 Input format: base58 string');
  console.log(`📏 Length: ${keyString.length} characters\n`);
  
  // Decode base58 to byte array
  const decoded = bs58.decode(keyString);
  const array = Array.from(decoded);
  
  console.log('✅ Successfully decoded!');
  console.log(`✅ Array length: ${array.length} bytes\n`);
  
  if (array.length !== 64) {
    console.log(`⚠️  Warning: Expected 64 bytes, got ${array.length}`);
  }
  
  // Read current .env
  let envContent = readFileSync(envPath, 'utf8');
  
  // Replace the private key line
  const arrayString = JSON.stringify(array);
  envContent = envContent.replace(
    /SOLANA_PRIVATE_KEY=.*/,
    `SOLANA_PRIVATE_KEY=${arrayString}`
  );
  
  // Write back to .env
  writeFileSync(envPath, envContent);
  
  console.log('✅ Updated .env file with array format!');
  console.log(`\n📋 New format (first 10 elements): [${array.slice(0, 10).join(',')},...]`);
  console.log('\n🎉 Conversion complete!\n');
  console.log('Next steps:');
  console.log('  1. Run: npm run check-wallet');
  console.log('  2. Choose devnet or mainnet');
  console.log('  3. Run: npm run mint-token\n');
  
} catch (error) {
  console.log('❌ Failed to convert key');
  console.log('   Error:', error.message);
  console.log('\n💡 The key format is not recognized.');
  console.log('   Expected either:');
  console.log('   - base58 string (from Phantom/Sollet)');
  console.log('   - JSON array [123,45,67,...]');
  process.exit(1);
}

