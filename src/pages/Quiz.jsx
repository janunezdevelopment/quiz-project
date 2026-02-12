import { useState, useEffect } from "react"
import { shuffle } from "../utils.jsx"

function Quiz({ gameData, onPlayAgain }) {
  
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Guard clause: ensure gameData exists and is an array
    if (Array.isArray(gameData) && gameData.length > 0) {
      
      // Transform the incoming props into a shuffled state
      const randomized = gameData.map((q) => ({
        ...q,
        // Combine and shuffle immediately
        options: shuffle([q.correct_answer, ...q.incorrect_answers])
      }));

      setShuffledQuestions(randomized);
    }
  }, [gameData]); // Re-runs if the parent sends totally new data

  const handleAnswerClick = (questionIndex, answer) => {
    if (!showResults) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionIndex]: answer
      }));
    }
  };

  if (shuffledQuestions.length === 0) return <p>Loading questions...</p>;
    
  const questionElements = shuffledQuestions.map((item, index) => {
    return (
      <section className="questions-answers-section" key={index}>
        <label className="text-color-dark-blue karla-font">{item.question}</label>
        <div className="answer-button-container">
          {item.options.map((answer, answerIndex) => {
            const isSelected = selectedAnswers[index] === answer;
            const isCorrect = answer === item.correct_answer;
            const showCorrect = showResults && isCorrect;
            const showIncorrect = showResults && isSelected && !isCorrect;
            
            return (
              <button 
                key={answerIndex} 
                type="button"
                onClick={() => handleAnswerClick(index, answer)}
                className={`answer-button text-color-dark-blue small-font 
                  ${isSelected && !showResults ? 'selected-answer' : ''}
                  ${showCorrect ? 'correct-answer' : ''}
                  ${showIncorrect ? 'incorrect-answer' : ''}`}
              >
                {answer}
              </button>
            );
          })}
        </div>
      </section>
    )
  })

  const handleSubmit = event => {
    event.preventDefault();
    
    // Check if all questions have been answered
    const allAnswered = Object.keys(selectedAnswers).length === shuffledQuestions.length;
    
    if (!showResults && allAnswered) {
      // Calculate score
      let correctCount = 0;
      shuffledQuestions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correct_answer) {
          correctCount++;
        }
      });
      
      setScore(correctCount);
      setShowResults(true);
    } else if (showResults) {
      // Fetch new questions and reset the quiz
      setSelectedAnswers({});
      setShowResults(false);
      setScore(0);
      onPlayAgain();
    }
  }
  
  const allAnswered = Object.keys(selectedAnswers).length === shuffledQuestions.length;
  const isButtonDisabled = !showResults && !allAnswered;
  
  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      {questionElements}
      <div className="results-container">
        {showResults && (
          <p className="score-text text-color-dark-blue karla-font">
            You scored {score}/{shuffledQuestions.length} correct answers
          </p>
        )}
        <button 
          type="submit"
          className="form-submission-button text-color-cream"
          disabled={isButtonDisabled}
        >
          {showResults ? 'Play again' : 'Check answers'}
        </button>
      </div>
    </form>
  )
}

export default Quiz