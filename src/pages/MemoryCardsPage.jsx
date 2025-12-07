import { useState } from "react";
import { MemoryCard } from "../components/memory-cards/MemoryCard";

const COLUMNS = 6;
const ROWS = 3;

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
          style={{ gridTemplateColumns: `repeat(${COLUMNS}, auto)` }}
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

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      grid.push({ key: grid.length, icon: "😀", revealed: false });
    }
  }
  return grid;
}
