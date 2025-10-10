/**
 * Validate and test SOLANA_PRIVATE_KEY format
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

console.log('🔍 Validating SOLANA_PRIVATE_KEY format...\n');

if (!process.env.SOLANA_PRIVATE_KEY) {
  console.log('❌ SOLANA_PRIVATE_KEY not found in .env file\n');
  console.log('Add this to your .env file:');
  console.log('SOLANA_PRIVATE_KEY=[your,private,key,array,here]\n');
  process.exit(1);
}

const keyString = process.env.SOLANA_PRIVATE_KEY;

console.log('📝 Raw value (first 100 chars):', keyString.substring(0, 100) + '...\n');

// Check format
if (!keyString.startsWith('[')) {
  console.log('❌ Private key must start with [');
  console.log('   Current:', keyString.substring(0, 10));
  process.exit(1);
}

if (!keyString.endsWith(']')) {
  console.log('❌ Private key must end with ]');
  console.log('   Current:', '...' + keyString.substring(keyString.length - 10));
  process.exit(1);
}

// Try to parse
try {
  const parsed = JSON.parse(keyString);
  
  if (!Array.isArray(parsed)) {
    console.log('❌ Private key must be an array');
    process.exit(1);
  }
  
  if (parsed.length !== 64) {
    console.log(`⚠️  Warning: Private key should have 64 elements, found ${parsed.length}`);
    if (parsed.length < 64) {
      console.log('   ❌ Key is too short - invalid');
      process.exit(1);
    }
  }
  
  console.log('✅ Format is valid!');
  console.log(`✅ Array length: ${parsed.length} elements`);
  console.log(`✅ First few values: [${parsed.slice(0, 5).join(', ')}, ...]`);
  console.log('\n🎉 Your private key is correctly formatted!\n');
  console.log('Next step: Run "npm run check-wallet" to check balance');
  
} catch (error) {
  console.log('❌ Failed to parse private key as JSON');
  console.log('   Error:', error.message);
  console.log('\n💡 Common issues:');
  console.log('   - Missing quotes? NO - should be: [123,45,67]');
  console.log('   - Extra characters? Remove any spaces or newlines');
  console.log('   - Copy-paste error? Try copying the key again');
  console.log('\n📋 Correct format example:');
  console.log('   SOLANA_PRIVATE_KEY=[174,47,154,16,202,193,206,113,...]');
  process.exit(1);
}

