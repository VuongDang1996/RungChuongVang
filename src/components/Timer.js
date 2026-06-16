export class CountdownTimer {
  constructor({ duration = 15, onTick, onDone }) {
    this.duration = duration;
    this.onTick = onTick;
    this.onDone = onDone;
    this.frameId = null;
    this.startTime = 0;
    this.running = false;
  }

  start() {
    this.stop();
    this.running = true;
    this.startTime = performance.now();
    this.tick();
  }

  stop() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
    this.frameId = null;
    this.running = false;
  }

  reset() {
    this.stop();
    this.onTick?.({
      remaining: this.duration,
      progress: 1,
      status: "idle"
    });
  }

  tick = () => {
    if (!this.running) return;

    const elapsed = (performance.now() - this.startTime) / 1000;
    const remaining = Math.max(this.duration - elapsed, 0);
    const progress = remaining / this.duration;

    this.onTick?.({
      remaining,
      progress,
      status: remaining <= 0 ? "done" : "running"
    });

    if (remaining <= 0) {
      this.stop();
      this.onDone?.();
      return;
    }

    this.frameId = requestAnimationFrame(this.tick);
  };
}

export function renderTimer(state) {
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference * (1 - state.progress);
  const ticks = Array.from({ length: state.duration }, (_, index) => `<span style="--tick: ${index}"></span>`).join("");
  const isDanger = state.remaining <= 3 && state.timerStatus !== "idle";
  const timerClass = [
    "timer",
    isDanger ? "timer--danger" : "",
    state.timerStatus === "done" ? "timer--done" : ""
  ].join(" ");

  return `
    <section class="${timerClass}" style="--dash-offset: ${dashOffset}; --circumference: ${circumference}">
      <div class="timer__ticks" aria-hidden="true">${ticks}</div>
      <svg class="timer__ring" viewBox="0 0 128 128" aria-hidden="true">
        <circle class="timer__track" cx="64" cy="64" r="54"></circle>
        <circle class="timer__progress" cx="64" cy="64" r="54"></circle>
      </svg>
      <div class="timer__content">
        <span class="timer__number">${Math.ceil(state.remaining)}</span>
        <span class="timer__label">${state.timerStatus === "done" ? "HẾT GIỜ!" : "GIÂY"}</span>
      </div>
    </section>
  `;
}

export function updateTimerView(state) {
  const timer = document.querySelector(".timer");
  if (!timer) return;

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference * (1 - state.progress);
  const number = timer.querySelector(".timer__number");
  const label = timer.querySelector(".timer__label");

  timer.style.setProperty("--dash-offset", dashOffset);
  timer.style.setProperty("--circumference", circumference);
  timer.classList.toggle("timer--danger", state.remaining <= 3 && state.timerStatus !== "idle");
  timer.classList.toggle("timer--done", state.timerStatus === "done");

  if (number) number.textContent = String(Math.ceil(state.remaining));
  if (label) label.textContent = state.timerStatus === "done" ? "HẾT GIỜ!" : "GIÂY";
}
