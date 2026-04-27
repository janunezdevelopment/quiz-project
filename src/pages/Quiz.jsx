import { useState, useEffect, useRef } from "react";
import { shuffle } from "../utils.jsx";
import Header from "../../components/Header.jsx";
import DifficultyOptions from "../../components/Difficulty-Options";

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

function Quiz({
  gameData,
  onPlayAgain,
  onResetQuiz,
  difficulty,
  onDifficultyChange,
}) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const questionHeadingRef = useRef(null);
  const resultsHeadingRef = useRef(null);

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

  useEffect(() => {
    if (shuffledQuestions.length === 0) {
      return;
    }

    if (showResults) {
      resultsHeadingRef.current?.focus();
      return;
    }

    questionHeadingRef.current?.focus();
  }, [showResults, currentQuestionIndex, shuffledQuestions.length]);

  const handleAnswerClick = (questionIndex, answer) => {
    if (!showResults) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionIndex]: answer,
      }));
    }
  };

  const handleAnswerKeyDown = (event, questionIndex, answerIndex, options) => {
    const { key, currentTarget } = event;
    const isNextKey = key === "ArrowRight" || key === "ArrowDown";
    const isPrevKey = key === "ArrowLeft" || key === "ArrowUp";
    const isHomeKey = key === "Home";
    const isEndKey = key === "End";

    if (!isNextKey && !isPrevKey && !isHomeKey && !isEndKey) {
      return;
    }

    event.preventDefault();

    let nextIndex = answerIndex;
    if (isNextKey) {
      nextIndex = (answerIndex + 1) % options.length;
    } else if (isPrevKey) {
      nextIndex = (answerIndex - 1 + options.length) % options.length;
    } else if (isHomeKey) {
      nextIndex = 0;
    } else if (isEndKey) {
      nextIndex = options.length - 1;
    }

    const nextAnswer = options[nextIndex];
    handleAnswerClick(questionIndex, nextAnswer);

    const optionButtons =
      currentTarget.parentElement?.querySelectorAll('[role="radio"]');
    optionButtons?.[nextIndex]?.focus();
  };

  if (shuffledQuestions.length === 0)
    return (
      <p
        className="loading-text"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Loading questions...
      </p>
    );

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;
  const hasCurrentAnswer = Boolean(selectedAnswers[currentQuestionIndex]);
  const currentSelectedAnswer = selectedAnswers[currentQuestionIndex];
  const questionId = `question-${currentQuestionIndex}`;

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

  const handleResetQuizClick = () => {
    onResetQuiz();
  };

  return (
    <div className="quiz-page">
      {!showResults && <Header />}
      <section className="quiz-form">
        {!showResults && (
          <>
            <section className="questions-answers-section">
              <h2
                id={questionId}
                className="question-text"
                ref={questionHeadingRef}
                tabIndex={-1}
              >
                {currentQuestion.question}
              </h2>
              <div
                className="answer-button-container"
                role="radiogroup"
                aria-labelledby={questionId}
              >
                {currentQuestion.options.map((answer, answerIndex) => {
                  const isSelected = currentSelectedAnswer === answer;
                  const isTabbable =
                    isSelected || (!currentSelectedAnswer && answerIndex === 0);

                  return (
                    <button
                      key={answerIndex}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={isTabbable ? 0 : -1}
                      onClick={() =>
                        handleAnswerClick(currentQuestionIndex, answer)
                      }
                      onKeyDown={(event) =>
                        handleAnswerKeyDown(
                          event,
                          currentQuestionIndex,
                          answerIndex,
                          currentQuestion.options,
                        )
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
              <div className="quiz-button-group">
                <button
                  type="button"
                  className="back-reset-button"
                  onClick={handleResetQuizClick}
                  aria-label="Back to intro and reset quiz"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  className="form-submission-button"
                  disabled={!hasCurrentAnswer}
                  onClick={handleNext}
                >
                  {isLastQuestion ? "See results" : "Next"}
                </button>
              </div>
            </div>
          </>
        )}

        {showResults && (
          <div className="intro-end">
            <h1 ref={resultsHeadingRef} tabIndex={-1}>
              QUIZTOPIA 3000
            </h1>
            <span>
              You scored {score}/{shuffledQuestions.length}!
            </span>
            <label htmlFor="results-difficulty">Select Difficulty:</label>
            <DifficultyOptions
              options={difficultyOptions}
              value={difficulty}
              onChange={(selectedOption) =>
                onDifficultyChange(selectedOption.value)
              }
              inputId="results-difficulty"
              name="results-difficulty"
              className="difficulty-select"
            />
            <button
              type="button"
              onClick={handlePlayAgainClick}
              className="play-again-btn"
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
