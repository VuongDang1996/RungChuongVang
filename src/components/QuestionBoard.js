import { getPlayedCount, isQuestionPlayed } from "../utils/gameState.js";
import { escapeHtml } from "../utils/text.js";

const levelClass = {
  "Dễ": "question-tile--easy",
  "Trung bình": "question-tile--medium",
  "Nâng cao": "question-tile--hard"
};

export function renderQuestionBoard({ questionPacks, questions, state }) {
  const playedCount = getPlayedCount(state);
  const remainingCount = questions.length - playedCount;
  const boardProgress = questions.length > 0 ? (playedCount / questions.length) * 100 : 0;
  const activePack = questionPacks.find((pack) => pack.id === state.activePackId) || questionPacks[0];

  const packCards = questionPacks
    .map((pack) => {
      const active = pack.id === state.activePackId;
      const packPlayedCount = state.playedQuestionIdsByPack.get(pack.id)?.size || 0;
      const packTotal = pack.questions.length;
      const empty = packTotal === 0;

      return `
        <button
          class="pack-card ${active ? "pack-card--active" : ""} ${empty ? "pack-card--empty" : ""}"
          data-action="select-pack"
          data-pack-id="${escapeHtml(pack.id)}"
          aria-pressed="${active ? "true" : "false"}"
        >
          <span class="pack-card__kicker">${empty ? "Chờ dữ liệu" : `${packPlayedCount}/${packTotal}`}</span>
          <strong>${escapeHtml(pack.title)}</strong>
          <span>${escapeHtml(pack.subtitle)}</span>
        </button>
      `;
    })
    .join("");

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

  const emptyState = `
    <div class="board-empty glass-panel">
      <span class="board-empty__icon">+</span>
      <h3>${escapeHtml(activePack.title)} chưa có câu hỏi</h3>
      <p>${escapeHtml(activePack.description)}</p>
      <code>src/data/questionPacks.js</code>
    </div>
  `;

  return `
    <section class="slide slide--board">
      <div class="board-shell">
        <header class="board-header">
          <div>
            <p class="eyebrow">Bảng chọn câu hỏi</p>
            <h2>Chọn thử thách tiếp theo</h2>
          </div>
          <div class="board-score glass-panel">
            <span>${questions.length > 0 ? "Đã chơi" : "Trạng thái"}</span>
            <strong>${questions.length > 0 ? `${playedCount}/${questions.length}` : "Chưa có"}</strong>
          </div>
        </header>

        <div class="pack-switcher" aria-label="Chọn gói câu hỏi">
          ${packCards}
        </div>

        <div class="board-progress" aria-label="Tiến độ câu đã chơi">
          <span style="width: ${boardProgress}%"></span>
        </div>

        ${
          questions.length > 0
            ? `<div class="board-grid" aria-label="Danh sách câu hỏi">${tiles}</div>`
            : emptyState
        }

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
