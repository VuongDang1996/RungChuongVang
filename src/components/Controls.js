export function renderQuestionControls({ canGoBack, canGoNext, timerStatus, answerVisible }) {
  const timerLabel = timerStatus === "running" ? "Đang tính giờ" : "Bắt đầu tính giờ";

  return `
    <nav class="control-bar" aria-label="Điều khiển câu hỏi">
      <button class="btn btn--ghost" data-action="back-to-board" ${canGoBack ? "" : "disabled"}>Bảng câu hỏi</button>
      <button class="btn btn--primary" data-action="start-timer" ${timerStatus === "running" ? "disabled" : ""}>${timerLabel}</button>
      <button class="btn btn--success" data-action="reveal-answer" ${answerVisible ? "disabled" : ""}>Hiện đáp án</button>
      <button class="btn btn--gold" data-action="continue-after-question" ${canGoNext ? "" : "disabled"}>Tiếp tục</button>
    </nav>
  `;
}

export function renderSimpleControls({ canGoBack, canGoNext, nextLabel = "Tiếp tục" }) {
  return `
    <nav class="control-bar control-bar--simple" aria-label="Điều hướng slide">
      <button class="btn btn--ghost" data-action="previous" ${canGoBack ? "" : "disabled"}>Quay lại</button>
      <button class="btn btn--gold" data-action="next" ${canGoNext ? "" : "disabled"}>${nextLabel}</button>
    </nav>
  `;
}
