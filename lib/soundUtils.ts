/**
 * Sound utilities using Web Audio API
 * Generates simple tones for game events
 */

class SoundGenerator {
  private audioContext: AudioContext | null = null;
  private enabled = true;
  private unlocked = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private async getContext(overrideEnabled = false): Promise<AudioContext | null> {
    if (!this.audioContext) return null;
    if (!this.enabled && !overrideEnabled) return null;

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    if (!this.unlocked) {
      try {
        const buffer = this.audioContext.createBuffer(1, 1, this.audioContext.sampleRate);
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);
        source.start(0);
        source.disconnect();
        this.unlocked = true;
      } catch (error) {
        console.warn('Audio warmup failed:', error);
      }
    }

    return this.audioContext;
  }

  async unlock() {
    await this.getContext(true);
  }

  private async playTone(
    frequency: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.25
  ) {
    const ctx = await this.getContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    const start = ctx.currentTime;
    gainNode.gain.setValueAtTime(volume, start);
    gainNode.gain.exponentialRampToValueAtTime(0.001, start + duration);

    oscillator.start(start);
    oscillator.stop(start + duration);
    oscillator.onended = () => {
      oscillator.disconnect();
      gainNode.disconnect();
    };
  }

  private playChord(frequencies: number[], duration: number, volume = 0.22) {
    frequencies.forEach(freq => {
      void this.playTone(freq, duration, 'sine', volume);
    });
  }

  private playSequence(
    frequencies: number[],
    duration = 0.16,
    gapMs = 80,
    type: OscillatorType = 'sine',
    volume = 0.24
  ) {
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        void this.playTone(freq, duration, type, volume);
      }, index * gapMs);
    });
  }

  // Spin sound - rising tone
  playSpinSound() {
    if (!this.enabled) return;

    const baseFrequency = 140;
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        void this.playTone(baseFrequency + i * 18, 0.14, 'triangle', 0.2);
      }, i * 70);
    }
  }

  // Win sound - happy chord progression
  playWinSound() {
    if (!this.enabled) return;

    // Warm major chord progression (A minor -> C major)
    this.playChord([220.0, 261.63, 329.63], 0.32);
    setTimeout(() => {
      this.playChord([246.94, 311.13, 392.0], 0.35);
    }, 210);
    setTimeout(() => {
      this.playChord([261.63, 329.63, 415.3], 0.45);
    }, 420);
  }

  // Big win sound - celebratory
  playBigWinSound() {
    if (!this.enabled) return;

    const start = 196;
    for (let i = 0; i < 9; i++) {
      setTimeout(() => {
        this.playChord([start + i * 22, start + i * 26], 0.24, 0.2);
      }, i * 110);
    }
  }

  // Small loss sound - gentle
  playLossSound() {
    if (!this.enabled) return;

    void this.playTone(210, 0.22, 'sawtooth', 0.18);
    setTimeout(() => {
      void this.playTone(160, 0.28, 'triangle', 0.16);
    }, 140);
  }

  // Click sound
  playClickSound() {
    if (!this.enabled) return;
    void this.playTone(240, 0.08, 'square', 0.22);
  }

  playToggleSound(isEnabled: boolean) {
    if (!this.enabled && !isEnabled) return;
    const frequencies = isEnabled ? [180, 240] : [240, 180];
    this.playSequence(frequencies, 0.12, 90, 'triangle', 0.2);
  }

  playAdjustUpSound() {
    if (!this.enabled) return;
    this.playSequence([170, 210, 250], 0.08, 55, 'triangle', 0.18);
  }

  playAdjustDownSound() {
    if (!this.enabled) return;
    this.playSequence([250, 210, 170], 0.08, 55, 'triangle', 0.18);
  }

  playRefreshSound() {
    if (!this.enabled) return;
    this.playSequence([190, 230, 270], 0.12, 70, 'triangle', 0.18);
  }

  playSuccessSound() {
    if (!this.enabled) return;
    this.playSequence([220, 280, 330, 392], 0.16, 90, 'sine', 0.22);
  }

  playErrorSound() {
    if (!this.enabled) return;
    this.playSequence([220, 160], 0.18, 120, 'sawtooth', 0.2);
  }

  playModalOpenSound() {
    if (!this.enabled) return;
    this.playSequence([160, 210], 0.14, 95, 'sine', 0.2);
  }

  playModalCloseSound() {
    if (!this.enabled) return;
    this.playSequence([210, 160], 0.14, 95, 'sine', 0.2);
  }

  playRestartSound() {
    if (!this.enabled) return;
    this.playSequence([200, 240, 300], 0.1, 70, 'triangle', 0.2);
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
