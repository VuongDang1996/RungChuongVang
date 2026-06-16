export const TITLE_SLIDE = 0;
export const RULES_SLIDE = 1;
export const QUESTION_BOARD_SLIDE = 2;
export const FIRST_QUESTION_SLIDE = 3;

export function createGameState(questionPacks) {
  const defaultPack = questionPacks[0];

  return {
    slideIndex: 0,
    totalSlides: getTotalSlides(defaultPack?.questions.length || 0),
    totalQuestions: defaultPack?.questions.length || 0,
    activePackId: defaultPack?.id || "",
    playedQuestionIdsByPack: new Map(questionPacks.map((pack) => [pack.id, new Set()])),
    lastQuestionIndex: null,
    remaining: 15,
    duration: 15,
    progress: 1,
    timerStatus: "idle",
    answerVisible: false
  };
}

export function getTotalSlides(totalQuestions) {
  return totalQuestions + 4;
}

export function getActiveQuestionPack(state, questionPacks) {
  return questionPacks.find((pack) => pack.id === state.activePackId) || questionPacks[0];
}

export function getActiveQuestions(state, questionPacks) {
  return getActiveQuestionPack(state, questionPacks)?.questions || [];
}

export function getActivePlayedSet(state) {
  if (!state.playedQuestionIdsByPack.has(state.activePackId)) {
    state.playedQuestionIdsByPack.set(state.activePackId, new Set());
  }

  return state.playedQuestionIdsByPack.get(state.activePackId);
}

export function switchQuestionPack(state, questionPacks, packId) {
  const nextPack = questionPacks.find((pack) => pack.id === packId);
  if (!nextPack) return false;

  state.activePackId = nextPack.id;
  state.totalQuestions = nextPack.questions.length;
  state.totalSlides = getTotalSlides(state.totalQuestions);
  state.lastQuestionIndex = null;
  resetQuestionState(state);
  return true;
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
  return getActivePlayedSet(state).has(questionId);
}

export function markQuestionPlayed(state, questionId) {
  getActivePlayedSet(state).add(questionId);
}

export function getPlayedCount(state) {
  return getActivePlayedSet(state).size;
}

export function areAllQuestionsPlayed(state) {
  return state.totalQuestions > 0 && getPlayedCount(state) >= state.totalQuestions;
}

export function resetQuestionState(state) {
  state.remaining = state.duration;
  state.progress = 1;
  state.timerStatus = "idle";
  state.answerVisible = false;
}

export function resetGameProgress(state) {
  for (const playedSet of state.playedQuestionIdsByPack.values()) {
    playedSet.clear();
  }
  state.lastQuestionIndex = null;
  resetQuestionState(state);
}
