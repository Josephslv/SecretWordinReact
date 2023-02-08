// style
import './App.css';
// data
import {wordsList} from './data/words'
// react
import { useCallback, useEffect, useState } from 'react'
// components
import StartScreen from './components/StartScreen';
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = [
  {id:1, name: 'start'},
  {id:1, name: 'game'},
  {id:1, name: 'end'},
]

function App() {
  let [gameStage, setGameStage] = useState(stages[0].name);
  let [words] = useState(wordsList)


  let [pickedWord, setPickedWord] = useState('');
  let [pickedCategory, setPickedCategory] = useState('');
  let [letters, setLetters] = useState([]);

  let [guessedLetters, setGuessedLetters] = useState([]);
  let [wrongLetters, setWrongLetters] = useState([]);

  let guessesQty = 3;
  let [guesses, setGuesses] = useState(guessesQty);
  let [score, setScore] = useState(0);



  const pickedWordAndCategory = () => {
    const categories = Object.keys(words)
    const category = categories[Math.floor( Math.random() * Object.keys(categories).length )]
    const word = words[category][Math.floor( Math.random() * words[category].length )]

    return {category, word}
  }


  let startGame = () => {
    clearLettersStates();
    setGuesses(guessesQty)

    let {category, word} = pickedWordAndCategory()
    let wordLetters = word.split('')

    wordLetters = wordLetters.map((x) => x.toLowerCase());

    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)


    setGameStage(stages[1].name)
  }

  let verifyLetter = (letter) => {
    let normalizedLetter = letter.toLowerCase()

    if(wrongLetters.includes(normalizedLetter) || guessedLetters.includes(normalizedLetter)){
      return;
      alert('Esta letra já foi inserida!')
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])

    } else {

      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])  

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  let clearLettersStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if(guesses <= 0){
      clearLettersStates();  // reset all states

      setGameStage(stages[2].name)
    }
  }, [guesses])


  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
  
    if(guessedLetters.length === uniqueLetters.length ){
      setScore((actualScore) => actualScore += 100)
      startGame();
    }
  }, [guessedLetters, startGame, letters])
  
  
  
  let retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    console.log('retry')
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage == 'start' && <StartScreen start={startGame}/>}
      {gameStage == 'game' && <Game
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {gameStage == 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
