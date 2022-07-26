import { useState, useEffect } from "react";
import Card from "./components/Card";

function App() {
  const [game, setGame] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [clearCards, setClearCards] = useState([]);
  const [playing, setplaying] = useState(true);

  // create an array with 36 items 1-18 with each number repeating twice
  const orderedArray = [];

  for (let i = 1; i < 19; i++) {
    orderedArray.push(i, i);
  }

  // function to shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  // iseEffect to set game state
  useEffect(() => {
    setGame(shuffleArray(orderedArray));
  }, []);

  console.log(game);

  // if length of open cards is less than 2, when a card is clicked, add to open cards
  function revealCard(value, index) {
    if (
      openCards.length < 2 &&
      !openCards.includes(index) &&
      !clearCards.includes(index)
    ) {
      setOpenCards((prevCard) => [...prevCard, index]);
    }
  }

  // function to check if value of indexed cards are equal, if equal, add to clear cards state and clear open cards.
  function checkCards() {
    const [first, second] = openCards;
    console.log(first, second);
    if (game[first] === game[second]) {
      setClearCards((prevCards) => prevCards.concat(openCards));
      setOpenCards([]);
    }
    // if not equal, clear open cards after 1 second
    setTimeout(() => {
      setOpenCards([]);
    }, 1000);
  }

  // when opencards changes and open cards length is equal to 2, run check function
  useEffect(() => {
    if (openCards.length === 2) {
      const timeout = setTimeout(() => {
        checkCards();
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [openCards]);

  useEffect(() => {
    if (clearCards.length === 36) {
      setplaying(false);
    }
  }, [clearCards]);

  console.log("open", openCards, "clear", clearCards);

  function restart() {
    setOpenCards([]);
    setClearCards([]);
    setplaying(true);
    setGame(shuffleArray(orderedArray));
  }

  return (
    <div>
      <h1>Memory Game</h1>
      <div className="game-container">
        {playing ? (
          <div className="game-grid">
            {game.map((item, index) => {
              return (
                <div
                  className={clearCards.includes(index) ? "hidden" : "card"}
                  key={index}
                  onClick={() => revealCard(item, index)}
                >
                  <Card
                    item={item}
                    clearCards={clearCards}
                    index={index}
                    openCards={openCards}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="button-container">
            <button className="play-again" onClick={restart}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
