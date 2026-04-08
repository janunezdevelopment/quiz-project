import { useState } from "react";
import Intro from "./pages/Intro.jsx";
import Quiz from "./pages/Quiz.jsx";
import { fetchQuestions } from "./utils.jsx";

function App() {
  const [gameState, setGameState] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadQuestions = async () => {
    setLoading(true);
    setGameData(null);
    try {
      const cleanData = await fetchQuestions();
      setGameData(cleanData);
      console.log(cleanData);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  const startGame = () => {
    setGameState((prev) => !prev);
    loadQuestions();
  };

  const handlePlayAgain = () => {
    return loadQuestions();
  };

  return (
    <div className="app-container">
      <img id="blob1" src="./src/assets/imgs/blob 1.png" />
      <img id="blob2" src="./src/assets/imgs/blob 2.png" />
      {!gameState && <Intro startGame={startGame} />}
      {gameState && <Quiz gameData={gameData} onPlayAgain={handlePlayAgain} />}
    </div>
  );
}

export default App;
