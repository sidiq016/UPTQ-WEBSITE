/**
 * Synthesizes harmonic Arabic Maqamat scales using Web Audio API
 * Generates resonant reed flute (Nay) / acoustic string harmonics
 */
class MaqamAudioEngine {
  private ctx: AudioContext | null = null;
  private currentOscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private timeoutIds: number[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playMaqamSequence(
    frequencies: number[],
    onProgress?: (index: number) => void,
    onEnded?: () => void
  ) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.isPlaying = true;
    const noteDuration = 0.65; // seconds per note
    const now = this.ctx.currentTime;

    frequencies.forEach((freq, idx) => {
      const noteStart = now + idx * noteDuration;
      const tId = window.setTimeout(() => {
        if (this.isPlaying && onProgress) {
          onProgress(idx);
        }
      }, idx * noteDuration * 1000);
      this.timeoutIds.push(tId);

      // Multi-harmonic overtone synthesis for warm resonant Nay/Oud quality
      const osc1 = this.ctx!.createOscillator();
      const osc2 = this.ctx!.createOscillator();
      const osc3 = this.ctx!.createOscillator();
      const noteGain = this.ctx!.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, noteStart);

      // 2nd harmonic (warmth)
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, noteStart);

      // Subtle breath vibrato
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(freq * 3, noteStart);

      // Envelope ADSR
      noteGain.gain.setValueAtTime(0, noteStart);
      noteGain.gain.linearRampToValueAtTime(0.18, noteStart + 0.08); // attack
      noteGain.gain.exponentialRampToValueAtTime(0.12, noteStart + 0.35); // decay to sustain
      noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration - 0.05); // release

      osc1.connect(noteGain);
      osc2.connect(noteGain);
      osc3.connect(noteGain);
      noteGain.connect(this.ctx!.destination);

      osc1.start(noteStart);
      osc2.start(noteStart);
      osc3.start(noteStart);

      osc1.stop(noteStart + noteDuration);
      osc2.stop(noteStart + noteDuration);
      osc3.stop(noteStart + noteDuration);

      this.currentOscillators.push(osc1, osc2, osc3);
    });

    const totalDuration = frequencies.length * noteDuration * 1000;
    const endId = window.setTimeout(() => {
      this.isPlaying = false;
      if (onEnded) onEnded();
    }, totalDuration);
    this.timeoutIds.push(endId);
  }

  public stop() {
    this.timeoutIds.forEach(id => clearTimeout(id));
    this.timeoutIds = [];
    this.currentOscillators.forEach(osc => {
      try {
        osc.stop();
      } catch {
        // already stopped
      }
    });
    this.currentOscillators = [];
    this.isPlaying = false;
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const maqamEngine = new MaqamAudioEngine();
