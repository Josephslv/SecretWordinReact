import './GameOver.css'

const GameOver = ({retry, score}) => {
  return (
    <div className='retry'>
        <h1>Secret Word Game</h1>

        <h4>Sua pontuação foi de: <span className='spanData'>{score}</span></h4>

        <button onClick={retry}>Resetar o game</button>
    </div>
  )
}

export default GameOver