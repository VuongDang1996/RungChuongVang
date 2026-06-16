export const TITLE_SLIDE = 0;
export const RULES_SLIDE = 1;
export const QUESTION_BOARD_SLIDE = 2;
export const FIRST_QUESTION_SLIDE = 3;

export function createGameState(totalQuestions) {
  return {
    slideIndex: 0,
    totalSlides: totalQuestions + 4,
    totalQuestions,
    playedQuestionIds: new Set(),
    lastQuestionIndex: null,
    remaining: 15,
    duration: 15,
    progress: 1,
    timerStatus: "idle",
    answerVisible: false
  };
}

export function isQuestionBoardSlide(state) {
  return state.slideIndex === QUESTION_BOARD_SLIDE;
}

export function isQuestionSlide(state) {
  return state.slideIndex >= FIRST_QUESTION_SLIDE && state.slideIndex < FIRST_QUESTION_SLIDE + state.totalQuestions;
}

export function getQuestionIndex(state) {
  return state.slideIndex - FIRST_QUESTION_SLIDE;
}

export function getQuestionSlideIndex(questionIndex) {
  return FIRST_QUESTION_SLIDE + questionIndex;
}

export function getVictorySlideIndex(state) {
  return state.totalSlides - 1;
}

export function isQuestionPlayed(state, questionId) {
  return state.playedQuestionIds.has(questionId);
}

export function markQuestionPlayed(state, questionId) {
  state.playedQuestionIds.add(questionId);
}

export function getPlayedCount(state) {
  return state.playedQuestionIds.size;
}

export function areAllQuestionsPlayed(state) {
  return getPlayedCount(state) >= state.totalQuestions;
}

export function resetQuestionState(state) {
  state.remaining = state.duration;
  state.progress = 1;
  state.timerStatus = "idle";
  state.answerVisible = false;
}

export function resetGameProgress(state) {
  state.playedQuestionIds.clear();
  state.lastQuestionIndex = null;
  resetQuestionState(state);
}
