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
      <div class="home-hero">
        <div class="home-wave home-wave--light" aria-hidden="true"></div>
        <div class="home-wave home-wave--blue" aria-hidden="true"></div>
        <div class="home-decor" aria-hidden="true">
          <span class="home-star home-star--one"></span>
          <span class="home-star home-star--two"></span>
          <span class="home-star home-star--three"></span>
          <span class="home-star home-star--four"></span>
          <span class="home-bolt home-bolt--one"></span>
          <span class="home-bolt home-bolt--two"></span>
          <svg class="home-plane home-plane--top" viewBox="0 0 96 82" role="img">
            <path d="M8 30 88 6 58 76 43 48 8 30Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round" />
            <path d="M43 48 88 6 29 40" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg class="home-plane home-plane--bottom" viewBox="0 0 96 82" role="img">
            <path d="M8 30 88 6 58 76 43 48 8 30Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round" />
            <path d="M43 48 88 6 29 40" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg class="home-dash home-dash--top" viewBox="0 0 320 130" role="img">
            <path d="M8 86c70 52 114-42 166 4 31 27 44 5 34-14-16-28-78 16-2 38 48 14 76-24 104-94" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="12 14" />
          </svg>
          <svg class="home-dash home-dash--bottom" viewBox="0 0 260 110" role="img">
            <path d="M4 8c46 48 82 13 104 48 16 27-26 43-42 15-13-23 35-42 76-17 36 22 50 58 114 38" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="12 14" />
          </svg>
        </div>

        <div class="home-copy">
          <p class="home-kicker">Gia đình Hưng Đạo Liên Hoà</p>
          <h1 class="home-title">
            <span>Sáng</span>
            <span>Danh Đạo</span>
            <span>Thầy</span>
          </h1>
          <p class="subtitle">Cùng bước vào hành trình thử thách kiến thức, lan tỏa tinh thần học đạo và phụng sự.</p>
        </div>

        <figure class="home-photo-card">
          <img class="home-photo" src="/assets/cover.jpg" alt="Tập thể thanh thiếu niên trong chương trình Sáng Danh Đạo Thầy" />
          <figcaption class="home-ribbon">Thượng Đế trong tất cả</figcaption>
        </figure>

        <button class="home-start-button" data-action="next">
          <span class="home-start-icon" aria-hidden="true">
            <svg viewBox="0 0 80 56" role="img">
              <path d="M21 20h-8a10 10 0 0 0-10 9v13c0 6 7 9 11 4l9-11h34l9 11c4 5 11 2 11-4V29a10 10 0 0 0-10-9h-8" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M22 13h36M29 29v14M22 36h14" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
              <circle cx="56" cy="33" r="3.5" fill="currentColor" />
              <circle cx="66" cy="40" r="3.5" fill="currentColor" />
            </svg>
          </span>
          <span>Bắt đầu trò chơi</span>
          <span class="home-start-arrow" aria-hidden="true">›</span>
        </button>

        <div class="home-badges" aria-label="Thông tin trò chơi">
          <span class="home-badge">
            <span class="home-badge__icon home-badge__icon--gold" aria-hidden="true">
              <svg viewBox="0 0 48 48" role="img">
                <path d="M8 11c7 0 12 2 16 6 4-4 9-6 16-6v27c-7 0-12 2-16 6-4-4-9-6-16-6V11Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
                <path d="M24 17v27" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
              </svg>
            </span>
            Ngành Thiếu
          </span>
          <span class="home-badge">
            <span class="home-badge__icon home-badge__icon--red" aria-hidden="true">
              <svg viewBox="0 0 48 48" role="img">
                <path d="M24 39c-9-5-13-12-12-21 5 1 9 4 12 10 3-6 7-9 12-10 1 9-3 16-12 21Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
                <path d="M24 10v28M14 29c-4-2-6-5-7-10 4 0 7 2 10 6M34 29c4-2 6-5 7-10-4 0-7 2-10 6" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
              </svg>
            </span>
            Ngành Đồng
          </span>
          <span class="home-badge">
            <span class="home-badge__icon home-badge__icon--white" aria-hidden="true">
              <svg viewBox="0 0 48 48" role="img">
                <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" stroke-width="4" />
                <path d="M18 18a7 7 0 1 1 9 7c-3 1-4 3-4 6" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
                <path d="M24 37h.01" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
              </svg>
            </span>
            20 câu hỏi
          </span>
          <span class="home-badge">
            <span class="home-badge__icon home-badge__icon--white" aria-hidden="true">
              <svg viewBox="0 0 48 48" role="img">
                <path d="M15 9h18v6c0 8-4 14-9 14s-9-6-9-14V9Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
                <path d="M15 14H9c0 7 3 11 9 12M33 14h6c0 7-3 11-9 12M24 29v7M16 39h16" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
              </svg>
            </span>
            20 giây mỗi câu
          </span>
        </div>
      </div>
    </section>
  `;
}

function renderRulesSlide(state) {
  const rules = [
    ["20 giây", "Mỗi câu hỏi có 20 giây suy nghĩ trước khi hết giờ."],
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
