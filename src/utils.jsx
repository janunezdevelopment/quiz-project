import he from "he";

export const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const formatQuizData = (data) => {
  return data.map((item) => {
    return {
      ...item,
      question: he.decode(item.question),
      incorrect_answers: item.incorrect_answers.map((ans) => he.decode(ans)),
      correct_answer: he.decode(item.correct_answer),
    };
  });
};

export const fetchQuestions = async (difficulty = "easy") => {
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
};

export const loadQuestions = async ({
  gameData,
  setLoading,
  setGameData,
  setGameState,
}) => {
  const hasExistingQuestions = Array.isArray(gameData) && gameData.length > 0;
  setLoading(true);
  try {
    const cleanData = await fetchQuestions();
    setGameData(cleanData);
    console.log(cleanData);
  } catch (error) {
    console.error("Fetch failed", error);
    if (!hasExistingQuestions) {
      setGameState(false);
    }
  } finally {
    setLoading(false);
  }
};

export const startGame = ({ setGameState, loadQuestionsHandler }) => {
  setGameState((prev) => !prev);
  loadQuestionsHandler();
};

export const handlePlayAgain = ({ loadQuestionsHandler }) => {
  return loadQuestionsHandler();
};
