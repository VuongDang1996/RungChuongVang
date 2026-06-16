export function renderProgressBar({ current, total, label = "" }) {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return `
    <div class="top-progress" aria-label="Tiến trình câu hỏi">
      <div class="top-progress__meta">
        <span>${label}</span>
        <strong>${current}/${total}</strong>
      </div>
      <div class="top-progress__track">
        <span class="top-progress__fill" style="width: ${percent}%"></span>
      </div>
    </div>
  `;
}
