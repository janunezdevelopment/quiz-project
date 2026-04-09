import { useState } from "react";
import Intro from "./pages/Intro.jsx";
import Quiz from "./pages/Quiz.jsx";
import { loadQuestions, startGame, handlePlayAgain } from "./utils.jsx";

function App() {
  const [gameState, setGameState] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  const loadQuestionsHandler = () =>
    loadQuestions({
      gameData,
      difficulty,
      setLoading,
      setGameData,
      setGameState,
    });

  const startGameHandler = () =>
    startGame({ setGameState, loadQuestionsHandler });

  const handlePlayAgainHandler = () =>
    handlePlayAgain({ loadQuestionsHandler });

  return (
    <div className="app-container">
      <img id="blob1" src="./src/assets/imgs/blob 1.png" />
      <img id="blob2" src="./src/assets/imgs/blob 2.png" />
      {!gameState && (
        <Intro
          startGame={startGameHandler}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />
      )}
      {gameState && (
        <Quiz
          gameData={gameData}
          onPlayAgain={handlePlayAgainHandler}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />
      )}
    </div>
  );
}

export default App;
