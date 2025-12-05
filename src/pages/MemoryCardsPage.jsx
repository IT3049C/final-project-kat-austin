import { useState } from "react";
import { MemoryCard } from "../components/memory-cards/MemoryCard";

const COLUMNS = 6;
const ROWS = 3;

export function MemoryCardsPage() {
  const [grid] = useState(setupGrid);

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
          {grid.map((v) => (
            <MemoryCard {...v} revealed={true} />
          ))}
        </div>
      </main>
    </>
  );
}

function setupGrid() {
  const grid = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      grid.push({ icon: "😀" });
    }
  }
  return grid;
}
