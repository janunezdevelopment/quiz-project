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
    `https://opentdb.com/api.php?amount=4&category=18&difficulty=${difficulty}&type=multiple`,
  );
  const data = await response.json();
  return formatQuizData(data.results);
};
