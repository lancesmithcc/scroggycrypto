# 🎰 Scroggy's Casino - Complete Testing Guide

## 🌐 Your Casino URLs

**Local Development**: http://localhost:3000
**Blockchain Token**: https://solscan.io/token/AdcLttHqoFQ5XSU8QFzehb7gfwB5Ys4bp7hf3y5anFzG

---

## ✅ Complete Testing Checklist

### 1. Landing Page Testing

**URL**: http://localhost:3000

- [ ] Page loads without errors
- [ ] See "🎰 Scroggy's Casino 🎰" title with gold glow
- [ ] "Start Playing Now" button is visible
- [ ] Three feature cards display (Emoji Slots, Sound Effects, Leaderboard)
- [ ] Background has gradient effect
- [ ] Responsive: Resize browser window - layout adapts
- [ ] Footer disclaimer shows "utility tokens for entertainment only"

**✨ Visual Check**:
- Gold (#FFD700) and red (#DC143C) color scheme
- Smooth animations on hover
- Professional casino aesthetic

---

### 2. Authentication Testing

**From Landing Page**:

- [ ] Click "🎰 Start Playing Now!" button
- [ ] Clerk sign-up modal appears
- [ ] Sign up with email (or use existing account)
- [ ] After sign-up, redirected to game page
- [ ] User profile icon appears in header

**Alternative Test**:
- [ ] Sign out (if signed in)
- [ ] Try to go directly to /game
- [ ] Should be redirected to sign-in

---

### 3. Game Page Layout

**URL**: http://localhost:3000/game (must be signed in)

**Header**:
- [ ] Casino logo on left
- [ ] Your username displays
- [ ] User profile button (Clerk) on right
- [ ] Border and styling looks good

**Three-Column Layout** (Desktop):
- [ ] **Left**: Payout table + Player stats
- [ ] **Center**: Slot machine
- [ ] **Right**: Leaderboard

**Mobile/Responsive**:
- [ ] Resize to mobile width
- [ ] Columns stack vertically
- [ ] Everything readable and accessible

---

### 4. Slot Machine Core Features

**Initial State**:
- [ ] Three reels showing 🎰 symbols
- [ ] Bet amount starts at 1
- [ ] Balance shows 10 tokens
- [ ] Spin button is enabled
- [ ] Sound toggle (🔊) visible in top-right

**Bet Controls**:
- [ ] Click **+** button → bet increases
- [ ] Click **-** button → bet decreases
- [ ] Minimum bet: 1 token
- [ ] Maximum bet: 10 tokens
- [ ] Can't bet more than balance
- [ ] Potential win amount updates

**🔊 Sound Toggle**:
- [ ] Click speaker icon
- [ ] Icon changes: 🔊 ↔ 🔇
- [ ] Sounds enable/disable accordingly

---

### 5. Spinning Mechanics

**Single Spin Test**:
- [ ] Set bet to 1 token
- [ ] Click "🎰 SPIN 🎰" button
- [ ] Button disabled during spin
- [ ] Reels animate (blur/spin effect)
- [ ] Spin lasts ~2 seconds
- [ ] Three emoji symbols appear
- [ ] Balance updates correctly
- [ ] Stats increment (games played)

**Sound During Spin** (if enabled):
- [ ] Hear rising tone when spin starts
- [ ] Hear result sound when spin ends

---

### 6. Winning Combinations

**Test Different Outcomes**:

Keep spinning until you get wins! Try to hit:

**Triple Matches** (Best):
- [ ] 💎💎💎 (50x) - Triple Diamonds
- [ ] 7️⃣7️⃣7️⃣ (40x) - Lucky Sevens  
- [ ] ⭐⭐⭐ (30x) - Triple Stars
- [ ] 🍉🍉🍉 (20x) - Triple Watermelon
- [ ] 🍇🍇🍇 (15x) - Triple Grapes
- [ ] 🍊🍊🍊 (12x) - Triple Orange
- [ ] 🍋🍋🍋 (10x) - Triple Lemon
- [ ] 🍒🍒🍒 (8x) - Triple Cherry

**Double Matches** (Good):
- [ ] 💎💎 (5x) - Double Diamonds
- [ ] 7️⃣7️⃣ (4x) - Double Sevens
- [ ] ⭐⭐ (3x) - Double Stars
- [ ] 🍉🍉 (2x) - Double Watermelon

**When You Win**:
- [ ] Win message displays with combination name
- [ ] Payout amount shown
- [ ] Win animation (flash effect)
- [ ] 🎉 Win sound plays (if sound enabled)
- [ ] Balance increases correctly
- [ ] Total wins increments

**When You Lose**:
- [ ] No win message
- [ ] Gentle loss sound (if enabled)
- [ ] Balance decreases by bet amount
- [ ] Total losses increments

---

### 7. Big Win Test

**Goal**: Get a 20x+ win

- [ ] Spin until you get a big win (20x or more)
- [ ] Special big win sound plays (longer celebration)
- [ ] Biggest win stat updates if it's your record
- [ ] Balance shows correct amount

---

### 8. Sound System Testing

**Toggle Sounds**:
- [ ] Sounds ON (🔊) - test all sounds
- [ ] Sounds OFF (🔇) - verify silence
- [ ] Toggle multiple times - works consistently

**Individual Sounds** (with sound ON):
- [ ] **Click sound**: Press +/- bet buttons
- [ ] **Spin sound**: Rising tone during spin
- [ ] **Win sound**: Happy chords on win
- [ ] **Big win sound**: Celebration on 20x+ wins
- [ ] **Loss sound**: Gentle tone on loss

**Quality Check**:
- [ ] Sounds don't overlap badly
- [ ] Volume is reasonable
- [ ] No distortion or crackling

---

### 9. Player Statistics

**Left Panel - YOUR STATS**:

After playing several games:
- [ ] **Games Played**: Increments with each spin
- [ ] **Total Wins**: Count of winning spins
- [ ] **Total Losses**: Count of losing spins
- [ ] **Biggest Win**: Highest payout amount
- [ ] **Win Rate**: Percentage calculation correct

**Manual Verification**:
- Spin 10 times, count actual wins/losses
- [ ] Stats match your count
- [ ] Win rate = (wins ÷ games) × 100

---

### 10. Payout Table

**Left Panel - PAYOUT TABLE**:

- [ ] All 12 combinations listed
- [ ] Emoji symbols display correctly
- [ ] Combination names shown
- [ ] Multipliers visible (2x to 50x)
- [ ] Hover effect on items
- [ ] Tip text at bottom
- [ ] Easy to read and understand

---

### 11. Leaderboard System

**Right Panel - LEADERBOARD**:

**Initial State**:
- [ ] Shows your player entry
- [ ] Your balance displayed
- [ ] Rank number shown
- [ ] Total wins visible

**After Playing**:
- [ ] Click "🔄 Refresh Leaderboard"
- [ ] Data updates
- [ ] Your new balance reflected
- [ ] Ranking may change

**Multiple Players** (if possible):
- [ ] Sign in with different account
- [ ] Play some games
- [ ] Check leaderboard shows both players
- [ ] Sorted by balance (highest first)

**Top Player**:
- [ ] Player ranked #1 gets special badge
- [ ] "TOP PLAYER" tag displays
- [ ] Different styling (gold border)

**Medals**:
- [ ] 🥇 for rank 1
- [ ] 🥈 for rank 2
- [ ] 🥉 for rank 3
- [ ] 🏅 for rank 4-10

---

### 12. Balance Management

**Starting Balance**:
- [ ] New player starts with 10 tokens
- [ ] Balance displays in slot machine
- [ ] Shows in stats section

**Betting Tests**:
- [ ] Bet 1 token → balance decreases by 1 (if lose)
- [ ] Bet 5 tokens → balance decreases by 5 (if lose)
- [ ] Win with bet → balance = balance - bet + payout

**Running Out of Tokens**:
- [ ] Keep spinning until balance < 1
- [ ] Spin button disabled when balance = 0
- [ ] "Out of Tokens" message appears
- [ ] Can't place bets

---

### 13. Advanced Betting

**Bet Amount Tests**:

- [ ] Set bet to **1** → spin → works
- [ ] Set bet to **5** → spin → works
- [ ] Set bet to **10** → spin → works

**Edge Cases**:
- [ ] Balance = 3, try to bet 5 → Can't increase past 3
- [ ] Balance = 15, bet 10, win 100 → Balance = 105
- [ ] + button disabled when bet = 10
- [ ] - button disabled when bet = 1

**Potential Win Display**:
- [ ] Shows "Potential Win: X tokens (max)"
- [ ] Updates when bet changes
- [ ] Max = bet × 50

---

### 14. Responsive Design

**Desktop** (> 1024px):
- [ ] Three columns side by side
- [ ] Everything readable
- [ ] Proper spacing
- [ ] Hover effects work

**Tablet** (768px - 1024px):
- [ ] Layout adjusts
- [ ] Two columns or stacked
- [ ] Touch-friendly buttons
- [ ] Still readable

**Mobile** (< 768px):
- [ ] Single column layout
- [ ] Payout table readable
- [ ] Slot machine fits screen
- [ ] Leaderboard scrollable
- [ ] Touch controls work
- [ ] Text sizes appropriate

**Test Method**:
- Open browser DevTools (F12)
- Toggle device toolbar
- Test iPhone, iPad, Android sizes

---

### 15. Browser Compatibility

Test in different browsers:

- [ ] **Chrome**: Everything works
- [ ] **Firefox**: Everything works
- [ ] **Safari**: Everything works
- [ ] **Edge**: Everything works

---

### 16. Performance Testing

**Load Times**:
- [ ] Landing page loads quickly
- [ ] Game page loads quickly
- [ ] No long loading screens
- [ ] Animations smooth (60fps)

**Spinning Performance**:
- [ ] Spin 10 times rapidly
- [ ] No lag or stuttering
- [ ] Animations stay smooth
- [ ] UI remains responsive

**Memory**:
- [ ] Play 50+ games
- [ ] Check browser memory (DevTools)
- [ ] No obvious memory leaks
- [ ] Performance stays consistent

---

### 17. Error Handling

**Network Issues**:
- [ ] Disable network (airplane mode)
- [ ] Try to spin
- [ ] Error handled gracefully
- [ ] Re-enable network → works again

**Authentication**:
- [ ] Sign out during game
- [ ] Redirected appropriately
- [ ] Sign back in → data persists

---

### 18. Data Persistence

**Refresh Test**:
- [ ] Play a few games
- [ ] Note your balance and stats
- [ ] Refresh page (F5)
- [ ] Balance restored
- [ ] Stats retained
- [ ] Leaderboard shows same data

**Sign Out/In**:
- [ ] Play games, note balance
- [ ] Sign out
- [ ] Sign back in
- [ ] Balance and stats restored

---

### 19. Visual Polish

**Animations**:
- [ ] Reels spin smoothly
- [ ] Win flash effect works
- [ ] Button hover effects
- [ ] Transitions smooth

**Colors & Theme**:
- [ ] Gold glow effects visible
- [ ] Casino red/gold theme consistent
- [ ] Dark backgrounds
- [ ] Good contrast (readable text)

**Typography**:
- [ ] All text readable
- [ ] Font sizes appropriate
- [ ] No text overflow
- [ ] Emoji symbols display correctly

---

### 20. Console Errors

**Browser Console Check**:
- [ ] Open DevTools (F12)
- [ ] Go to Console tab
- [ ] Play several games
- [ ] **No red errors** (warnings OK)
- [ ] API calls succeed (200 status)

---

## 🎯 Quick 5-Minute Test

Don't have time for full testing? Do this:

1. ✅ Go to http://localhost:3000
2. ✅ Sign in/up
3. ✅ Turn sound ON (🔊)
4. ✅ Spin 5 times
5. ✅ Check balance updates
6. ✅ Check stats increment
7. ✅ Refresh leaderboard
8. ✅ Resize window (mobile view)
9. ✅ Refresh page (data persists)
10. ✅ Check console (no errors)

---

## 🐛 Bug Reporting Template

If you find any issues, note:

```
Issue: [Brief description]
Steps to reproduce:
  1. 
  2. 
  3. 
Expected: [What should happen]
Actual: [What actually happened]
Browser: [Chrome/Firefox/Safari]
Screen size: [Desktop/Mobile]
Console errors: [Yes/No - copy error]
```

---

## ✅ Sign-Off Checklist

Before deploying, verify:

- [ ] All core features work
- [ ] No console errors
- [ ] Sounds play correctly
- [ ] Responsive on mobile
- [ ] Data persists after refresh
- [ ] Leaderboard updates
- [ ] Stats track correctly
- [ ] Performance is good
- [ ] Looks professional
- [ ] Ready to show off! 🎉

---

## 🎊 After Testing

Once everything passes:
1. 📸 Take screenshots for portfolio
2. 🎥 Record a quick demo video
3. 📝 Note any features to add later
4. 🚀 Deploy to Netlify
5. 🌟 Share with friends!

---

**Have fun testing your casino!** 🎰✨

