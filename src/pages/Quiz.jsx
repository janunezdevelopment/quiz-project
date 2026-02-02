import { useState, useEffect } from "react"
import { shuffle } from "../utils.jsx"

function Quiz({ gameData }) {
  
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

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

  if (shuffledQuestions.length === 0) return <p>Loading questions...</p>;
    
  const questionElements = shuffledQuestions.map((item, index) => {
    return (
      <section className="questions-answers-section" key={index}>
        <label className="text-color-dark-blue karla-font">{item.question}</label>
        <div className="answer-button-container">
          {item.options.map((answer, answerIndex) => (
            <button key={answerIndex} className="answer-button text-color-dark-blue small-font">
              {answer}
            </button>
          ))}
        </div>
      </section>
    )
  })

  const handleSubmit = event => {
    event.preventDefault()
    alert('Form Submitted')
  }
  
  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      {questionElements}
      <button className="form-submission-button text-color-cream">Check answers</button>
    </form>
  )
}

export default Quiz