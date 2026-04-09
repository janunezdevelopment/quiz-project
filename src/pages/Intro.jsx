function Intro({ startGame, difficulty, onDifficultyChange }) {
  return (
    <div className="intro">
      <h1>QUIZZICAL</h1>
      <span>A quiz about computer tech</span>
      <label htmlFor="difficulty">Select Difficulty:</label>
      <select
        name="difficulty"
        id="difficulty"
        className="difficulty-select"
        value={difficulty}
        onChange={(event) => onDifficultyChange(event.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={startGame} className="start-game-btn">Start Quiz</button>
    </div>
  );
}

export default Intro;
