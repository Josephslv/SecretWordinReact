import './StartScreen.css'

const StartScreen = ({start}) => {
  return (
    <div className='start'>
        <h1>Secret Word Game</h1>
        <p>clique no botão abaixo para jogar</p>
        <button onClick={start}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen