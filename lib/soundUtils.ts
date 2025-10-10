/**
 * Sound utilities using Web Audio API
 * Generates simple tones for game events
 */

class SoundGenerator {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  private playChord(frequencies: number[], duration: number) {
    frequencies.forEach(freq => this.playTone(freq, duration));
  }

  // Spin sound - rising tone
  playSpinSound() {
    if (!this.enabled || !this.audioContext) return;

    const now = this.audioContext.currentTime;
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        this.playTone(200 + i * 50, 0.1, 'square');
      }, i * 50);
    }
  }

  // Win sound - happy chord progression
  playWinSound() {
    if (!this.enabled || !this.audioContext) return;

    // Play a happy major chord
    this.playChord([523.25, 659.25, 783.99], 0.3); // C, E, G
    
    setTimeout(() => {
      this.playChord([587.33, 739.99, 880.00], 0.4); // D, F#, A
    }, 200);

    setTimeout(() => {
      this.playChord([659.25, 783.99, 987.77], 0.6); // E, G, B
    }, 400);
  }

  // Big win sound - celebratory
  playBigWinSound() {
    if (!this.enabled || !this.audioContext) return;

    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        this.playChord([523.25 + i * 50, 659.25 + i * 50], 0.2);
      }, i * 100);
    }
  }

  // Small loss sound - gentle
  playLossSound() {
    if (!this.enabled || !this.audioContext) return;

    this.playTone(300, 0.2);
    setTimeout(() => this.playTone(250, 0.3), 150);
  }

  // Click sound
  playClickSound() {
    if (!this.enabled || !this.audioContext) return;
    this.playTone(800, 0.05, 'square');
  }
}

// Singleton instance
let soundGenerator: SoundGenerator | null = null;

export function getSoundGenerator(): SoundGenerator {
  if (typeof window !== 'undefined' && !soundGenerator) {
    soundGenerator = new SoundGenerator();
  }
  return soundGenerator!;
}

export default SoundGenerator;

