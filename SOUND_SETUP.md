# 🔊 Sound Setup Guide

## Current Status

✅ **Sound is now enabled!** The app uses the Web Audio API to generate sounds.

### What's Working:
- 🎵 **Spin Sound** - Rising tone when you spin
- 🎉 **Win Sound** - Happy chord progression for wins
- 💰 **Big Win Sound** - Celebratory sounds for 20x+ wins
- 😢 **Loss Sound** - Gentle tone when you don't win
- 🖱️ **Click Sound** - Feedback for bet adjustments
- 🔊/🔇 **Toggle Button** - Enable/disable sounds (top right of slot machine)

## How to Use

1. **Refresh your browser** - The new sound features should load
2. **Look for the speaker icon** (🔊) in the top-right corner of the slot machine
3. **Click to toggle** sound on/off
4. **Play the game** - You'll hear sounds for spins, wins, losses, and button clicks!

## Want Better Quality Sounds?

The current implementation uses synthesized sounds. For professional-quality audio:

### Option 1: Free Sound Libraries

Download free casino sound effects from:
- **Freesound.org** - https://freesound.org/
- **ZapSplat** - https://www.zapsplat.com/
- **Mixkit** - https://mixkit.co/free-sound-effects/

Search for:
- "slot machine spin"
- "casino win"
- "jackpot"
- "button click"
- "casino ambience"

### Option 2: Add Your Own Sounds

1. **Get sound files** (.mp3 format recommended)
2. **Place them in** `public/sounds/` directory:
   ```
   public/sounds/
   ├── spin.mp3
   ├── win.mp3
   ├── big-win.mp3
   ├── lose.mp3
   └── click.mp3
   ```

3. **Install use-sound library**:
   ```bash
   npm install use-sound
   ```

4. **Update SlotMachine.tsx** to use the sound files:
   ```typescript
   import useSound from 'use-sound';

   // Add to component:
   const [playSpinSound] = useSound('/sounds/spin.mp3', { volume: 0.5 });
   const [playWinSound] = useSound('/sounds/win.mp3', { volume: 0.6 });
   const [playBigWinSound] = useSound('/sounds/big-win.mp3', { volume: 0.7 });
   const [playLoseSound] = useSound('/sounds/lose.mp3', { volume: 0.3 });
   const [playClickSound] = useSound('/sounds/click.mp3', { volume: 0.2 });

   // Replace soundGenerator calls with:
   playSpinSound();  // Instead of soundGenerator.playSpinSound()
   ```

### Option 3: Add Background Music

1. Get a casino-themed background music loop
2. Save as `public/sounds/background.mp3`
3. Add to your component:
   ```typescript
   const [playBgMusic, { stop: stopBgMusic }] = useSound('/sounds/background.mp3', {
     volume: 0.2,
     loop: true
   });
   ```

## Sound Volume Levels

Current volumes (adjustable):
- **Clicks**: 30% (subtle)
- **Spin**: 30% 
- **Loss**: 30% (gentle)
- **Win**: 30% (noticeable)
- **Big Win**: 30% (exciting!)

## Browser Compatibility

✅ Works in all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Opera

⚠️ **Note**: Some browsers require user interaction before playing sounds (this is handled automatically when you click spin).

## Troubleshooting

### No sound playing?
1. Check browser volume settings
2. Make sure the 🔊 icon is showing (not 🔇)
3. Try clicking the toggle button to refresh
4. Check browser console for errors (F12)

### Sound too loud/quiet?
You can adjust volumes in `lib/soundUtils.ts`:
```typescript
gainNode.gain.setValueAtTime(0.3, ...) // Change 0.3 to 0.1-1.0
```

### Want to disable certain sounds?
Comment out the sound calls in `components/SlotMachine.tsx`:
```typescript
// if (soundGenerator && soundEnabled) {
//   soundGenerator.playClickSound();
// }
```

## Future Enhancements

Potential sound features:
- [ ] Different sounds for different win amounts
- [ ] Reel stopping sounds (sequential)
- [ ] Near-miss sounds
- [ ] Background casino ambience
- [ ] Celebratory fanfare for jackpots
- [ ] Volume slider control
- [ ] Sound preference saving

## Technical Details

The current implementation uses:
- **Web Audio API** - Browser built-in audio generation
- **Oscillators** - Generate tone frequencies
- **Gain Nodes** - Control volume and fade
- **Chord Progressions** - Multiple frequencies for richer sounds

### Sound Types Generated:
- **Square Wave** - Sharp, digital sounds (spin, clicks)
- **Sine Wave** - Smooth, musical tones (wins, chords)

---

**Enjoy your casino with sound!** 🎰🔊

