import he from "he";

export async function fetchQuestions(difficulty = "easy") {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=3&category=18&difficulty=${difficulty}&type=multiple`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (
    data.response_code !== 0 ||
    !Array.isArray(data.results) ||
    data.results.length === 0
  ) {
    throw new Error("OpenTDB returned no questions. Please try again.");
  }

  return formatQuizData(data.results);
}

export function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function formatQuizData(data) {
  return data.map((item) => {
    return {
      ...item,
      question: he.decode(item.question),
      incorrect_answers: item.incorrect_answers.map((ans) => he.decode(ans)),
      correct_answer: he.decode(item.correct_answer),
    };
  });
}

export async function loadQuestions({
  gameData,
  difficulty,
  setLoading,
  setGameData,
  setGameState,
  setHasFetchError,
}) {
  const hasExistingQuestions = Array.isArray(gameData) && gameData.length > 0;
  setHasFetchError(false);
  setLoading(true);
  try {
    const cleanData = await fetchQuestions(difficulty);
    setGameData(cleanData);
  } catch (error) {
    console.error("Fetch failed", error);
    setHasFetchError(true);
    if (!hasExistingQuestions) {
      setGameState(false);
    }
  } finally {
    setLoading(false);
  }
}

export function startGame({ setGameState, loadQuestionsHandler }) {
  setGameState((prev) => !prev);
  loadQuestionsHandler();
}

export function handlePlayAgain({ loadQuestionsHandler }) {
  return loadQuestionsHandler();
}
