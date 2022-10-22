
import { useEffect, useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/cabbage.png", matched: false },
  { "src": "/img/carrot.png", matched: false },
  { "src": "/img/eggplant.png", matched: false },
  { "src": "/img/onion.png", matched: false },
  { "src": "/img/potato.png", matched: false },
  { "src": "/img/tomato.png", matched: false },
]
console.log(cardImages)

function App() {
  const [showModal, setShowModal] = useState(false);
 
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  //when clicking on cards
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  //for disabling cards
  const [disabled, setDisabled] = useState(false)

  //shuffle cards
  const shuffleCards = () => {
    //double cards
    const shuffledCards = [...cardImages, ...cardImages]
      //sort for mix them up
      .sort(() => Math.random() - 0.5)
      //fire func for each item (in new sorted arr) and add id property
      .map(card => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) => {

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected cards
  useEffect(() => {
    //check is it is a value for both choices
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceOne, choiceTwo])


  //reset choices & increase turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
    if(cards.filter((card) => card.matched === false).length === 2){
      setShowModal(true)
    }
  }

  //start new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  //handleClick
  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />

        ))}

      </div>
      <p>Turns: {turns}</p>

      {showModal &&
        <Modal handleClose={handleClose}> <h2>The END</h2></Modal>}
    </div>
  );
}

export default App;
