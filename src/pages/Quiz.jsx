import { useState, useEffect } from "react";
import { shuffle } from "../utils.jsx";
import Header from "../../components/Header.jsx";

function Quiz({ gameData, onPlayAgain, difficulty, onDifficultyChange }) {
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
      {!showResults && <Header />}
      <section className="quiz-form">
        {!showResults && (
          <>
            <section className="questions-answers-section">
              <label>{currentQuestion.question}</label>
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
                      className={`answer-button ${
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
              <p className="score-text">
                Question {currentQuestionIndex + 1}/{shuffledQuestions.length}
              </p>
              <button
                type="button"
                className="form-submission-button"
                disabled={!hasCurrentAnswer}
                onClick={handleNext}
              >
                {isLastQuestion ? "See results" : "Next"}
              </button>
            </div>
          </>
        )}

        {showResults && (
          <div className="intro">
            <h1>QUIZZICAL</h1>
            <span>
              You scored {score}/{shuffledQuestions.length}!
            </span>
            <label htmlFor="results-difficulty">Select Difficulty:</label>
            <select
              id="results-difficulty"
              name="results-difficulty"
              className="difficulty-select"
              value={difficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <button type="button" onClick={handlePlayAgainClick} className="play-again-btn">
              Play again
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Quiz;
