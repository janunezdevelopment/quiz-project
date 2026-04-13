import { useState } from "react";
import Intro from "./pages/Intro.jsx";
import Quiz from "./pages/Quiz.jsx";
import Error from "./pages/Error.jsx";
import { loadQuestions, startGame, handlePlayAgain } from "./utils.jsx";

function App() {
  const [gameState, setGameState] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [hasFetchError, setHasFetchError] = useState(false);

  const loadQuestionsHandler = () =>
    loadQuestions({
      gameData,
      difficulty,
      setLoading,
      setGameData,
      setGameState,
      setHasFetchError,
    });

  const startGameHandler = () =>
    startGame({ setGameState, loadQuestionsHandler });

  const handlePlayAgainHandler = () =>
    handlePlayAgain({ loadQuestionsHandler });

  return (
    <div className="app-container">
      {hasFetchError && <Error />}
      {!hasFetchError && !gameState && (
        <Intro
          startGame={startGameHandler}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />
      )}
      {!hasFetchError && gameState && (
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
