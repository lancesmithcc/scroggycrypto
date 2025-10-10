# Scroggy's Casino - Product Requirements Document

## Overview
Scroggy's Casino is a fun, emoji-based slot machine game built on the Solana blockchain ecosystem using utility tokens called ScroggyCoin.

## Vision
Create an engaging, browser-based casino slot machine game that combines modern web technologies with blockchain utility tokens, providing users with a fun gambling experience while maintaining full control over the token economy.

## Core Features

### 1. ScroggyCoin (Utility Token)
- **Token Name**: ScroggyCoin
- **Total Supply**: 1,000,000 tokens
- **Mint Cost**: 0.001 SOL
- **Token Type**: Utility tokens (NON-TRANSFERABLE outside the game)
- **Starting Balance**: 10 tokens per user
- **Economy**: House-controlled, all tokens stay within the game ecosystem

### 2. Slot Machine Game
- **Theme**: Emoji-based slot machine
- **Visuals**: Modern, fun, and engaging UI
- **Animations**: Smooth spinning animations and winning celebrations
- **Sound Effects**: Engaging audio feedback for spins and wins
- **Betting**: Users bet ScroggyCoins on each spin
- **Payouts**: Configurable payout table based on emoji combinations

### 3. User Authentication
- **Provider**: Clerk
- **Features**: 
  - Secure user login/signup
  - User profile management
  - Session management

### 4. Leaderboard System
- **Storage**: JSON file in repository
- **Update Method**: GitHub commits
- **Display**: Top players by token count
- **Honor**: Highest token holder gets special recognition

### 5. Token Economy
- **Starting Balance**: 10 tokens per new user
- **House Reset**: If total supply is exhausted by users, all tokens return to house
- **Distribution**: Controlled by house wallet

## Technical Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Blockchain**: Solana Web3.js

### Deployment
- **Platform**: Netlify
- **Build**: Static site generation where possible
- **API Routes**: Serverless functions

### Data Storage
- **User Data**: Clerk-managed
- **Game State**: Database/API
- **Leaderboard**: JSON file in repository

## User Flow

1. User visits Scroggy's Casino
2. User signs up/logs in via Clerk
3. User receives 10 ScroggyCoins
4. User plays slot machine:
   - Places bet
   - Spins reels (emoji animations)
   - Receives payout if winning combination
   - Balance updates
5. User can view leaderboard
6. Top player gets honored on leaderboard

## Design Principles

- **Modular Code**: Keep components small and focused (<500 lines)
- **Clean Architecture**: Separation of concerns
- **Efficient Performance**: Optimized animations and state management
- **User Experience**: Intuitive, fun, and engaging interface
- **Responsive Design**: Works on all device sizes

## Security & Compliance

- **Utility Tokens Only**: Clearly communicate non-transferable nature
- **No Real Money**: ScroggyCoins have no monetary value outside the game
- **Secure Authentication**: Leverage Clerk's security features
- **Wallet Security**: Private keys never exposed to frontend

## Success Metrics

- User engagement (spins per session)
- Return users (daily/weekly active)
- Token distribution across users
- Leaderboard competition activity

## Future Enhancements (Post-MVP)

- Multiple slot machine themes
- Achievement system
- Daily rewards
- Special bonus rounds
- Social features (sharing wins)
- Mobile app version

