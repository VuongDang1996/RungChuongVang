import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/animations.css";

import { questions } from "./data/questions.js";
import { CountdownTimer, updateTimerView } from "./components/Timer.js";
import { renderSlide } from "./components/SlideRenderer.js";
import {
  QUESTION_BOARD_SLIDE,
  areAllQuestionsPlayed,
  createGameState,
  getQuestionIndex,
  getQuestionSlideIndex,
  getVictorySlideIndex,
  isQuestionBoardSlide,
  isQuestionPlayed,
  isQuestionSlide,
  markQuestionPlayed,
  resetGameProgress,
  resetQuestionState
} from "./utils/gameState.js";

const app = document.querySelector("#app");
const state = createGameState(questions.length);

const timer = new CountdownTimer({
  duration: state.duration,
  onTick: ({ remaining, progress, status }) => {
    state.remaining = remaining;
    state.progress = progress;
    state.timerStatus = status;
    updateTimerView(state);
  },
  onDone: () => {
    state.remaining = 0;
    state.progress = 0;
    state.timerStatus = "done";
    render();
  }
});

function render() {
  app.innerHTML = `
    <main class="app-shell">
      <div class="stage-frame">
        ${renderSlide(state, questions)}
      </div>
    </main>
  `;
}

function goToSlide(index) {
  const nextIndex = Math.min(Math.max(index, 0), state.totalSlides - 1);
  if (nextIndex === state.slideIndex) return;

  if (isQuestionBoardSlide(state) && nextIndex > QUESTION_BOARD_SLIDE && !areAllQuestionsPlayed(state)) {
    return;
  }

  timer.stop();
  state.slideIndex = nextIndex;

  if (isQuestionSlide(state)) {
    resetQuestionState(state);
    timer.reset();
  } else {
    state.answerVisible = false;
    state.timerStatus = "idle";
  }

  render();
}

function nextSlide() {
  if (isQuestionSlide(state)) {
    continueAfterQuestion();
    return;
  }

  if (isQuestionBoardSlide(state)) {
    if (areAllQuestionsPlayed(state)) {
      goToSlide(getVictorySlideIndex(state));
    }
    return;
  }

  goToSlide(state.slideIndex + 1);
}

function previousSlide() {
  goToSlide(state.slideIndex - 1);
}

function startTimer() {
  if (!isQuestionSlide(state) || state.timerStatus === "running") return;
  state.answerVisible = false;
  state.timerStatus = "running";
  state.remaining = state.duration;
  state.progress = 1;
  render();
  timer.start();
}

function revealAnswer() {
  if (!isQuestionSlide(state)) return;
  timer.stop();
  state.answerVisible = true;
  const question = questions[getQuestionIndex(state)];
  if (question) {
    markQuestionPlayed(state, question.id);
  }
  if (state.timerStatus !== "done") {
    state.timerStatus = "idle";
  }
  render();
}

function selectQuestion(button) {
  const questionIndex = Number(button.dataset.questionIndex);
  const question = questions[questionIndex];
  if (!question || isQuestionPlayed(state, question.id)) return;

  timer.stop();
  state.lastQuestionIndex = questionIndex;
  state.slideIndex = getQuestionSlideIndex(questionIndex);
  resetQuestionState(state);
  timer.reset();
  render();
}

function backToBoard() {
  timer.stop();
  resetQuestionState(state);
  state.slideIndex = QUESTION_BOARD_SLIDE;
  render();
}

function continueAfterQuestion() {
  timer.stop();
  resetQuestionState(state);
  state.slideIndex = areAllQuestionsPlayed(state) ? getVictorySlideIndex(state) : QUESTION_BOARD_SLIDE;
  render();
}

function resetProgress() {
  timer.stop();
  resetGameProgress(state);
  state.slideIndex = 0;
  render();
}

app.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const action = button.dataset.action;
  const actions = {
    next: nextSlide,
    previous: previousSlide,
    "start-timer": startTimer,
    "reveal-answer": revealAnswer,
    "select-question": () => selectQuestion(button),
    "back-to-board": backToBoard,
    "continue-after-question": continueAfterQuestion,
    "reset-progress": resetProgress
  };

  actions[action]?.();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextSlide();
  if (event.key === "ArrowLeft") previousSlide();
  if (event.key.toLowerCase() === "b" && isQuestionSlide(state)) backToBoard();
  if (event.key === " ") {
    event.preventDefault();
    startTimer();
  }
});

render();
