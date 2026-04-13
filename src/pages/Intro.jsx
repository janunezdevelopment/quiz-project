import DifficultyOptions from "../../components/Difficulty-Options";

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

function Intro({ startGame, difficulty, onDifficultyChange }) {
  return (
    <div className="intro-end">
      <h1>QUIZTOPIA 3000</h1>
      <span>A quiz about computer tech</span>
      <label htmlFor="difficulty">Select Difficulty:</label>
      <DifficultyOptions
        options={difficultyOptions}
        value={difficulty}
        onChange={(selectedOption) => onDifficultyChange(selectedOption.value)}
        inputId="difficulty"
        name="difficulty"
        className="difficulty-select"
      />
      <button onClick={startGame} className="start-game-btn">
        Start Quiz
      </button>
    </div>
  );
}

export default Intro;
