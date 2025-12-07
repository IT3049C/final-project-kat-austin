import { useState } from "react";
import { MemoryCard } from "../components/memory-cards/MemoryCard";
import { config } from "../logic/memoryCards"

export function MemoryCardsPage() {
  const [grid, setGrid] = useState(setUpGrid());

  function handleCardClick(key) {
    setGrid(
      grid.map((card, i) =>
        i === key ? { ...card, revealed: !card.revealed } : card
      )
    );
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
              onClick={() => handleCardClick(card.key)}
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
      grid.push({ key: grid.length, icon: "😀", revealed: false });
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
