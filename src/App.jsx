import { useState } from "react";
import he from "he"
import Intro from "./pages/Intro.jsx"
import Quiz from "./pages/Quiz.jsx"

function App() {
  const [gameState, setGameState] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatQuizData = (data) => {
    return data.map(item => {
      return {
        ...item,
        question: he.decode(item.question),
        incorrect_answers: item.incorrect_answers.map(ans => he.decode(ans)),
        correct_answer: he.decode(item.correct_answer)
      };
    });
};

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=5&category=23&difficulty=hard&type=multiple');
      const data = await response.json();
      const cleanData = formatQuizData(data.results)
      setGameData(cleanData)
      console.log(cleanData)
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setLoading(false);
    }
  };
  
  const startGame = () => {
    setGameState(prev => !prev)
    fetchQuestions()
  }

  return (
    <div className="app-container">
      <img id="blob1" src="./src/assets/imgs/blob 1.png" />
      <img id="blob2" src="./src/assets/imgs/blob 2.png" />
      {!gameState && <Intro startGame={startGame} />}
      {gameState && <Quiz gameData={gameData} />}
    </div>
  )
}

export default App