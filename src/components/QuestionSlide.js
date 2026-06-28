import { renderQuestionControls } from "./Controls.js";
import { renderProgressBar } from "./ProgressBar.js";
import { renderTimer } from "./Timer.js";
import { escapeHtml } from "../utils/text.js";

function renderQuestionMedia(media) {
  if (!media) return "";

  const title = media.title ? `<strong>${escapeHtml(media.title)}</strong>` : "";
  const note = media.note ? `<p>${escapeHtml(media.note)}</p>` : "";

  if (media.type === "image" && media.src) {
    return `
      <figure class="question-media question-media--image">
        <img src="${escapeHtml(media.src)}" alt="${escapeHtml(media.alt || "")}" />
        ${media.caption ? `<figcaption>${escapeHtml(media.caption)}</figcaption>` : ""}
      </figure>
    `;
  }

  if (media.type === "audio" && media.src) {
    return `
      <div class="question-media question-media--audio">
        ${title}
        <audio controls src="${escapeHtml(media.src)}"></audio>
        ${note}
      </div>
    `;
  }

  if (media.type === "video" && media.src) {
    return `
      <div class="question-media question-media--video">
        ${title}
        <video controls src="${escapeHtml(media.src)}"></video>
        ${note}
      </div>
    `;
  }

  return `
    <div class="question-media question-media--placeholder">
      ${title || "<strong>Media sẽ được bổ sung</strong>"}
      ${note}
    </div>
  `;
}

function isOpenAnswerQuestion(question) {
  return question.answerType === "open" || !question.options;
}

function renderAnswerArea(question, state) {
  if (isOpenAnswerQuestion(question)) {
    return `
      <div class="open-answer-card">
        <span class="open-answer-card__label">Tự luận</span>
        <p>Người chơi trả lời trực tiếp, không chọn A/B/C/D.</p>
      </div>
    `;
  }

  const optionHtml = Object.entries(question.options)
    .map(([key, value]) => {
      const isCorrect = state.answerVisible && key === question.correctAnswer;
      const optionClass = ["answer-option", isCorrect ? "answer-option--correct" : ""].join(" ");

      return `
        <div class="${optionClass}">
          <span class="answer-option__key">${escapeHtml(key)}</span>
          <span class="answer-option__text">${escapeHtml(value)}</span>
        </div>
      `;
    })
    .join("");

  return `<div class="answer-grid">${optionHtml}</div>`;
}

export function renderQuestionSlide({ question, questionIndex, state }) {
  const answerLabel = isOpenAnswerQuestion(question) ? "Đáp án tự luận" : "Đáp án đúng";

  return `
    <section class="slide slide--question ${state.timerStatus === "done" ? "slide--time-up" : ""}">
      ${renderProgressBar({
        current: questionIndex + 1,
        total: state.totalQuestions,
        label: `Câu hỏi ${questionIndex + 1}/${state.totalQuestions}`
      })}

      <div class="question-grid">
        <div class="question-main glass-panel">
          <div class="question-kicker">
            <span>Câu ${question.id}</span>
            <strong>${escapeHtml(question.level)}</strong>
          </div>
          <h2>${escapeHtml(question.question)}</h2>
          ${renderQuestionMedia(question.media)}
          ${renderAnswerArea(question, state)}
          <div class="answer-reveal ${state.answerVisible ? "answer-reveal--visible" : ""}">
            <span>${answerLabel}: ${escapeHtml(question.correctAnswer)}</span>
            <p>${escapeHtml(question.explanation)}</p>
          </div>
        </div>

        <aside class="question-side">
          ${renderTimer(state)}
        </aside>
      </div>

      ${renderQuestionControls({
        canGoBack: state.slideIndex > 0,
        canGoNext: state.slideIndex < state.totalSlides - 1,
        timerStatus: state.timerStatus,
        answerVisible: state.answerVisible
      })}
    </section>
  `;
}
