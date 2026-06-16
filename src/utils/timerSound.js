export class TimerSound {
  constructor() {
    this.context = null;
    this.intervalId = null;
  }

  getContext() {
    if (!this.context) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return null;
      this.context = new AudioContext();
    }

    if (this.context.state === "suspended") {
      this.context.resume();
    }

    return this.context;
  }

  playTone({ frequency = 880, duration = 0.045, volume = 0.045, type = "sine" } = {}) {
    const context = this.getContext();
    if (!context) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.01);
  }

  playTick() {
    this.playTone({ frequency: 980, duration: 0.04, volume: 0.035, type: "square" });
  }

  playDone() {
    this.stop();
    this.playTone({ frequency: 620, duration: 0.08, volume: 0.05, type: "triangle" });
    window.setTimeout(() => {
      this.playTone({ frequency: 820, duration: 0.1, volume: 0.05, type: "triangle" });
    }, 105);
  }

  start() {
    this.stop();
    this.playTick();
    this.intervalId = window.setInterval(() => this.playTick(), 1000);
  }

  stop() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
    this.intervalId = null;
  }
}
