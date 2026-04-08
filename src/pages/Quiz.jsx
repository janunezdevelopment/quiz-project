import { useState, useEffect } from "react";
import { shuffle } from "../utils.jsx";
import Header from "../../components/Header.jsx";

function Quiz({ gameData, onPlayAgain }) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Guard clause: ensure gameData exists and is an array
    if (Array.isArray(gameData) && gameData.length > 0) {
      // Transform the incoming props into a shuffled state
      const randomized = gameData.map((q) => ({
        ...q,
        // Combine and shuffle immediately
        options: shuffle([q.correct_answer, ...q.incorrect_answers]),
      }));

      setSelectedAnswers({});
      setCurrentQuestionIndex(0);
      setShowResults(false);
      setScore(0);
      setShuffledQuestions(randomized);
    } else {
      setShuffledQuestions([]);
    }
  }, [gameData]); // Re-runs if the parent sends totally new data

  const handleAnswerClick = (questionIndex, answer) => {
    if (!showResults) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionIndex]: answer,
      }));
    }
  };

  if (shuffledQuestions.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;
  const hasCurrentAnswer = Boolean(selectedAnswers[currentQuestionIndex]);

  const calculateScore = () => {
    let correctCount = 0;
    shuffledQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const handleNext = () => {
    if (!hasCurrentAnswer || showResults) {
      return;
    }

    if (isLastQuestion) {
      setScore(calculateScore());
      setShowResults(true);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handlePlayAgainClick = async () => {
    await onPlayAgain();
  };

  return (
    <div className="quiz-page">
      <Header />
      <section className="quiz-form">
        {!showResults && (
          <>
            <section className="questions-answers-section">
              <label className="text-color-dark-blue karla-font">
                {currentQuestion.question}
              </label>
              <div className="answer-button-container">
                {currentQuestion.options.map((answer, answerIndex) => {
                  const isSelected =
                    selectedAnswers[currentQuestionIndex] === answer;

                  return (
                    <button
                      key={answerIndex}
                      type="button"
                      onClick={() =>
                        handleAnswerClick(currentQuestionIndex, answer)
                      }
                      className={`answer-button text-color-dark-blue ${
                        isSelected ? "selected-answer" : ""
                      }`}
                    >
                      {answer}
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="results-container">
              <p className="score-text text-color-dark-blue karla-font">
                Question {currentQuestionIndex + 1}/{shuffledQuestions.length}
              </p>
              <button
                type="button"
                className="form-submission-button text-color-cream"
                disabled={!hasCurrentAnswer}
                onClick={handleNext}
              >
                {isLastQuestion ? "See results" : "Next"}
              </button>
            </div>
          </>
        )}

        {showResults && (
          <div className="results-container">
            <p className="score-text text-color-dark-blue karla-font">
              Final score: {score}/{shuffledQuestions.length}
            </p>
            <button
              type="button"
              className="form-submission-button text-color-cream"
              onClick={handlePlayAgainClick}
            >
              Play again
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Quiz;
