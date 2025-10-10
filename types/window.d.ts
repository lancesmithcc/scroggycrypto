// Type declarations for Phantom Wallet
interface Window {
  solana?: {
    isPhantom?: boolean;
    connect: () => Promise<{ publicKey: { toString: () => string } }>;
    disconnect: () => Promise<void>;
    signAndSendTransaction: (transaction: any) => Promise<{ signature: string }>;
  };
}

