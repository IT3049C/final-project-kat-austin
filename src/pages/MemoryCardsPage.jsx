import { useCallback, useEffect, useState } from "react";
import { MemoryCard } from "../components/memory-cards/MemoryCard";
import { config, emojis } from "../logic/memoryCards";
import { loadSettings } from "../logic/storage";
import { GameHeader } from "../components/GameHeader";

const SELECTED_CARD_LIMIT = 2;
const CARD_REVEAL_MILISECS = 2000;

export function MemoryCardsPage() {
  const [grid, setGrid] = useState(setUpGrid());
  // Tracks the keys of the cards that have been selected. Should only contain
  // two at a time.
  const [selectedCardKeys, setSelectedCardKeys] = useState(
    /**@type {number[]}*/ ([])
  );
  const [triesLeft, setTriesLeft] = useState(20);

  /**
   * Checks if the two most recently selected cards match
   */
  const checkCards = useCallback(() => {
    if (selectedCardKeys.length === SELECTED_CARD_LIMIT && triesLeft !== 0) {
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
        setTriesLeft(triesLeft - 1);
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
  }, [grid, selectedCardKeys, triesLeft]);

  useEffect(() => {
    let timeoutId;
    if (selectedCardKeys.length === SELECTED_CARD_LIMIT) {
      timeoutId = setTimeout(checkCards, CARD_REVEAL_MILISECS);
    }
    return () => clearTimeout(timeoutId);
  }, [checkCards, selectedCardKeys.length]);

  function handleCardClick(clickedCard) {
    if (
      selectedCardKeys.length < SELECTED_CARD_LIMIT &&
      triesLeft !== 0 &&
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

  const settings = loadSettings();
  const playerName = settings?.name || "Player";

  let status = "Tries left: " + triesLeft;
  if (grid.every((card) => card.matchFound)) {
    status = "Winner!";
  } else if (triesLeft === 0) {
    status = "Game Over";
  }

  return (
    <>
      <GameHeader gameName="Memory Cards" playerName={playerName}/>
        <p>{status}</p>
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
    </>
  );
}

function setUpGrid() {
  const grid = [];
  // Need two of each icon.
  const icons = [...emojis, ...emojis];

  for (let row = 0; row < config.rows; row++) {
    for (let col = 0; col < config.columns; col++) {
      const elementData = randomElement(icons);

      grid.push({
        key: grid.length,
        icon: elementData.value,
        revealed: false,
        matchFound: false,
      });
      icons.splice(elementData.index, 1);
    }
  }
  return grid;
}

/**
 * Selects a random element from an array.
 * @returns The value selected from the array and the index its located at.
 * @url https://www.tutorialspoint.com/how-to-select-a-random-element-from-array-in-javascript
 */
function randomElement(array) {
  const index = Math.floor(Math.random() * array.length);
  return { value: array[index], index };
}
