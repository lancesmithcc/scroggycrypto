We are first minting a new cryptocurrency as a utility coin in the solana eco-system. The coin will be called scroggycoin. we have our wallet address in .env under SOLANA_ADDRESS

We want to mint with 0.001 and we want to create 1000000 tokens.

These tokens will be used to create a gambling game called Scroggy's Casino. It will be a slot machine that will use emojis in the machine. It will have fun animations and sound.

We will be hosting this site on netlify and we will use next.js, typescipt, tailwind css as our framework.
Keep the code modular, efficient and streamlined.

Note the tokens are UTILITY TOKENS ONLY. These tokens are not transferable out of the game. We will use clerk for user auth our keys for that are in .env under NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY

users will start with 10 tokens. if a user actually manages to exhaust the supply of tokens, then tall money gets sent back to the house. The player with highest tokens gets an honourable mention in the leaderboard. we will have a leaderboard stored in a .json file that will be updatable through github