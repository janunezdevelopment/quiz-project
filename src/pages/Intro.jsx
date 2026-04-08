function Intro({ startGame }) {
  return (
    <div className="intro">
      <h1 className="text-color-dark-blue karla-font">Quizzical</h1>
      <span className="text-color-dark-blue">A quiz about computer tech</span>
      <select className="text-color-dark-blue">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button
        onClick={startGame}
        className="button-background-color1 text-color-cream"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Intro;
