function Intro( { startGame }) {
  return (
    <div className="intro">
      <h1 className="text-color-dark-blue karla-font">Quizzical</h1>
      <span className="text-color-dark-blue">Some description if needed</span>
      <button onClick={startGame} className="button-background-color1 text-color-cream">Start Quiz</button>
    </div>
  )
}

export default Intro