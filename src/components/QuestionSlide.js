import { renderQuestionControls } from "./Controls.js";
import { renderProgressBar } from "./ProgressBar.js";
import { renderTimer } from "./Timer.js";
import { escapeHtml } from "../utils/text.js";

export function renderQuestionSlide({ question, questionIndex, state }) {
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
          <div class="answer-grid">${optionHtml}</div>
          <div class="answer-reveal ${state.answerVisible ? "answer-reveal--visible" : ""}">
            <span>Đáp án đúng: ${escapeHtml(question.correctAnswer)}</span>
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
