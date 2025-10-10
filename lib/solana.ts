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

/**
 * Solana utility functions for ScroggyCoin management
 * These functions handle the blockchain interactions for the utility token
 */

// Connect to Solana cluster
export function getConnection(network: 'devnet' | 'mainnet-beta' = 'devnet'): Connection {
  return new Connection(clusterApiUrl(network), 'confirmed');
}

/**
 * Create ScroggyCoin token mint
 * This should be run once to initialize the token
 */
export async function createScroggyCoin(
  connection: Connection,
  payer: Keypair,
  decimals: number = 0 // 0 decimals for whole tokens
): Promise<PublicKey> {
  try {
    // Create the token mint
    const mint = await createMint(
      connection,
      payer,
      payer.publicKey, // mint authority
      payer.publicKey, // freeze authority
      decimals,
      undefined,
      undefined,
      TOKEN_PROGRAM_ID
    );

    console.log('ScroggyCoin mint created:', mint.toBase58());
    return mint;
  } catch (error) {
    console.error('Error creating ScroggyCoin:', error);
    throw error;
  }
}

/**
 * Mint ScroggyCoin tokens to a wallet
 */
export async function mintScroggyCoin(
  connection: Connection,
  payer: Keypair,
  mint: PublicKey,
  destination: PublicKey,
  amount: number
): Promise<string> {
  try {
    // Get or create associated token account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      destination
    );

    // Mint tokens
    const signature = await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer.publicKey,
      amount
    );

    console.log('Minted', amount, 'ScroggyCoin to', destination.toBase58());
    console.log('Transaction signature:', signature);
    
    return signature;
  } catch (error) {
    console.error('Error minting ScroggyCoin:', error);
    throw error;
  }
}

/**
 * Get wallet balance in SOL
 */
export async function getWalletBalance(
  connection: Connection,
  publicKey: PublicKey
): Promise<number> {
  const balance = await connection.getBalance(publicKey);
  return balance / LAMPORTS_PER_SOL;
}

/**
 * Initialize wallet from private key
 */
export function getWalletFromPrivateKey(privateKeyString: string): Keypair {
  const privateKeyArray = JSON.parse(privateKeyString);
  return Keypair.fromSecretKey(Uint8Array.from(privateKeyArray));
}

/**
 * This is a utility script that should be run once to create the token
 * Run this separately as a Node.js script, not in the browser
 */
export async function initializeScroggyCoin() {
  const connection = getConnection('devnet'); // Use 'mainnet-beta' for production
  
  // Load wallet from environment variable
  if (!process.env.SOLANA_PRIVATE_KEY) {
    throw new Error('SOLANA_PRIVATE_KEY not found in environment variables');
  }
  
  const payer = getWalletFromPrivateKey(process.env.SOLANA_PRIVATE_KEY);
  
  // Create the mint
  const mint = await createScroggyCoin(connection, payer, 0);
  
  // Mint initial supply (1,000,000 tokens)
  await mintScroggyCoin(
    connection,
    payer,
    mint,
    payer.publicKey,
    1_000_000
  );
  
  console.log('ScroggyCoin initialized successfully!');
  console.log('Mint address:', mint.toBase58());
  console.log('Total supply: 1,000,000 tokens');
  
  return mint;
}

