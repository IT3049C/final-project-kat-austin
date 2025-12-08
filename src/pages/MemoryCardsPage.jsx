import { useState } from "react";
import { MemoryCard } from "../components/memory-cards/MemoryCard";
import { config, emojis } from "../logic/memoryCards";

const SELECTED_CARD_LIMIT = 2;

export function MemoryCardsPage() {
  const [grid, setGrid] = useState(setUpGrid());
  // Tracks the keys of the cards that have been selected. Should only contain
  // two at a time.
  /** @type {[number[], React.Dispatch<React.SetStateAction<number[]>>]} */
  const [selectedCardKeys, setSelectedCardKeys] = useState([]);

  function handleCardClick(clickedCard) {
    if (
      selectedCardKeys.length < SELECTED_CARD_LIMIT &&
      !clickedCard.revealed &&
      !clickedCard.matchFound
    ) {
      setGrid(
        grid.map((card) =>
          card.key === clickedCard.key ? { ...card, revealed: true } : card
        )
      );
      setSelectedCardKeys([...selectedCardKeys, clickedCard.key]);
    }
  }

  /** 
   * Checks if the two most recently selected cards match 
   */
  function checkCards() {
    if (selectedCardKeys.length === SELECTED_CARD_LIMIT) {
      const selectedCard1 = grid.find(
        (card) => card.key === selectedCardKeys[0]
      );
      const selectedCard2 = grid.find(
        (card) => card.key === selectedCardKeys[1]
      );
      let cardCheckResult;

      if (selectedCard1.icon === selectedCard2.icon) {
        // Indicate that a match has been found for that card
        cardCheckResult = { matchFound: true };
      } else {
        // Flip the cards back over if they don't match
        cardCheckResult = { revealed: false };
      }
      setGrid(
        grid.map((card) =>
          card.key === selectedCard1.key || card.key === selectedCard2.key
            ? { ...card, ...cardCheckResult }
            : card
        )
      );
      setSelectedCardKeys([]);
    }
  }

  if (selectedCardKeys.length === SELECTED_CARD_LIMIT) {
    setTimeout(checkCards, 2000);
  }

  return (
    <>
      <header>
        <h2>Memory Cards</h2>
      </header>
      <main>
        <div
          id="memory-card-container"
          style={{ gridTemplateColumns: `repeat(${config.columns}, auto)` }}
        >
          {grid.map((card) => (
            <MemoryCard
              {...card}
              key={card.key}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </main>
    </>
  );
}

function setUpGrid() {
  const grid = [];

  for (let row = 0; row < config.rows; row++) {
    for (let col = 0; col < config.columns; col++) {
      grid.push({
        key: grid.length,
        icon: randomElement(emojis),
        revealed: false,
        matchFound: false,
      });
    }
  }
  return grid;
}

/**
 * @url https://www.tutorialspoint.com/how-to-select-a-random-element-from-array-in-javascript
 */
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
