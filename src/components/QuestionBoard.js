import { getPlayedCount, isQuestionPlayed } from "../utils/gameState.js";
import { escapeHtml } from "../utils/text.js";

const levelClass = {
  "Dễ": "question-tile--easy",
  "Trung bình": "question-tile--medium",
  "Nâng cao": "question-tile--hard"
};

export function renderQuestionBoard({ questions, state }) {
  const playedCount = getPlayedCount(state);
  const remainingCount = questions.length - playedCount;
  const boardProgress = questions.length > 0 ? (playedCount / questions.length) * 100 : 0;

  const tiles = questions
    .map((question, index) => {
      const played = isQuestionPlayed(state, question.id);
      const isRecent = state.lastQuestionIndex === index;
      const classes = [
        "question-tile",
        levelClass[question.level] || "",
        played ? "question-tile--played" : "",
        isRecent ? "question-tile--recent" : ""
      ].join(" ");

      return `
        <button
          class="${classes}"
          data-action="select-question"
          data-question-index="${index}"
          ${played ? "disabled" : ""}
          aria-label="Chọn câu ${question.id}, mức độ ${escapeHtml(question.level)}"
        >
          <span class="question-tile__shine"></span>
          <span class="question-tile__number">${question.id}</span>
          <span class="question-tile__level">${escapeHtml(question.level)}</span>
          <span class="question-tile__status">${played ? "Đã chơi" : "Sẵn sàng"}</span>
          ${played ? '<span class="question-tile__check">✓</span>' : ""}
        </button>
      `;
    })
    .join("");

  return `
    <section class="slide slide--board">
      <div class="board-shell">
        <header class="board-header">
          <div>
            <p class="eyebrow">Bảng chọn câu hỏi</p>
            <h2>Chọn thử thách tiếp theo</h2>
          </div>
          <div class="board-score glass-panel">
            <span>Đã chơi</span>
            <strong>${playedCount}/${questions.length}</strong>
          </div>
        </header>

        <div class="board-progress" aria-label="Tiến độ câu đã chơi">
          <span style="width: ${boardProgress}%"></span>
        </div>

        <div class="board-grid" aria-label="Danh sách câu hỏi">
          ${tiles}
        </div>

        <footer class="board-footer">
          <div class="board-legend">
            <span class="legend-dot legend-dot--easy"></span>Dễ
            <span class="legend-dot legend-dot--medium"></span>Trung bình
            <span class="legend-dot legend-dot--hard"></span>Nâng cao
            <span class="legend-dot legend-dot--played"></span>Đã chơi
          </div>
          <div class="board-actions">
            <button class="btn btn--ghost" data-action="previous">Luật chơi</button>
            <button class="btn btn--gold" data-action="next" ${remainingCount > 0 ? "disabled" : ""}>Vinh quang</button>
          </div>
        </footer>
      </div>
    </section>
  `;
}
