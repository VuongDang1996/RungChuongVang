import { renderSimpleControls } from "./Controls.js";
import { renderQuestionBoard } from "./QuestionBoard.js";
import { renderQuestionSlide } from "./QuestionSlide.js";
import { QUESTION_BOARD_SLIDE, getActiveQuestions, getQuestionIndex, isQuestionSlide } from "../utils/gameState.js";

function renderStageBeams() {
  return `
    <div class="stage-beams" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
}

function renderBellVisual() {
  return `
    <div class="bell-visual" aria-hidden="true">
      <svg viewBox="0 0 240 240" role="img">
        <defs>
          <linearGradient id="bellGold" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stop-color="#fff4a3" />
            <stop offset="45%" stop-color="#ffd700" />
            <stop offset="100%" stop-color="#b97800" />
          </linearGradient>
        </defs>
        <path d="M108 35c0-11 24-11 24 0v16c38 7 61 40 61 90v22l17 23H30l17-23v-22c0-50 23-83 61-90V35Z" fill="url(#bellGold)" />
        <path d="M82 192h76c-5 19-20 30-38 30s-33-11-38-30Z" fill="#ffe774" />
        <path d="M64 163h112" stroke="#fff3a8" stroke-width="10" stroke-linecap="round" opacity=".75" />
      </svg>
    </div>
  `;
}

function renderTitleSlide(state) {
  return `
    <section class="slide slide--title">
      <img class="cover-photo" src="/assets/cover.jpg" alt="Tập thể thanh thiếu niên trong chương trình Sáng Danh Đạo Thầy" />
      <div class="cover-overlay" aria-hidden="true"></div>
      <div class="title-content title-content--cover">
        <p class="eyebrow">Game Show Tương Tác</p>
        <h1>Sáng Danh Đạo Thầy</h1>
        <p class="subtitle">Cùng bước vào hành trình thử thách kiến thức, lan tỏa tinh thần học đạo và phụng sự.</p>
        <div class="hero-actions">
          <button class="btn btn--hero" data-action="next">Bắt đầu trò chơi</button>
          <span>20 câu hỏi • 15 giây mỗi câu</span>
        </div>
      </div>
    </section>
  `;
}

function renderRulesSlide(state) {
  const rules = [
    ["15 giây", "Mỗi câu hỏi có 15 giây suy nghĩ trước khi hết giờ."],
    ["A/B/C/D", "Người chơi chọn một đáp án duy nhất cho mỗi câu hỏi."],
    ["Loại trực tiếp", "Trả lời sai sẽ rời khỏi sàn thi đấu theo luật chương trình."],
    ["Vinh quang", "Người còn lại cuối cùng sẽ hoàn thành thử thách."]
  ];

  return `
    <section class="slide slide--rules">
      ${renderStageBeams()}
      <div class="rules-header">
        <p class="eyebrow">Luật chơi</p>
        <h2>Sẵn sàng bước vào sàn thi đấu</h2>
      </div>
      <div class="rule-grid">
        ${rules
          .map(
            ([title, body]) => `
              <article class="rule-card glass-panel">
                <span class="rule-card__icon"></span>
                <h3>${title}</h3>
                <p>${body}</p>
              </article>
            `
          )
          .join("")}
      </div>
      ${renderSimpleControls({
        canGoBack: state.slideIndex > 0,
        canGoNext: state.slideIndex < state.totalSlides - 1,
        nextLabel: "Mở bảng câu hỏi"
      })}
    </section>
  `;
}

function renderVictorySlide(state) {
  const sparks = Array.from({ length: 36 }, (_, index) => `<span style="--i: ${index}"></span>`).join("");

  return `
    <section class="slide slide--victory">
      ${renderStageBeams()}
      <div class="fireworks" aria-hidden="true">${sparks}</div>
      <div class="victory-content">
        ${renderBellVisual()}
        <p class="eyebrow">Vinh quang</p>
        <h2>Chúc mừng người chiến thắng</h2>
        <p class="subtitle">Bạn đã vượt qua toàn bộ thử thách và cùng nhau Sáng Danh Đạo Thầy.</p>
        <button class="btn btn--hero" data-action="reset-progress">Chơi lại</button>
      </div>
      ${renderSimpleControls({
        canGoBack: state.slideIndex > 0,
        canGoNext: false,
        nextLabel: "Hoàn tất"
      })}
    </section>
  `;
}

export function renderSlide(state, questionPacks) {
  const questions = getActiveQuestions(state, questionPacks);

  if (state.slideIndex === 0) return renderTitleSlide(state);
  if (state.slideIndex === 1) return renderRulesSlide(state);
  if (state.slideIndex === QUESTION_BOARD_SLIDE) return renderQuestionBoard({ questionPacks, questions, state });

  if (isQuestionSlide(state)) {
    const questionIndex = getQuestionIndex(state);
    return renderQuestionSlide({
      question: questions[questionIndex],
      questionIndex,
      state
    });
  }

  return renderVictorySlide(state);
}
