import { useState } from "react";
import { loadSettings } from "../logic/storage";
import { PlayerInfoCard } from "../components/rps-game/PlayerInfoCard";
import { Board } from "../components/tic-tac-toe/Board";

export function TicTacToePage() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Load settings directly in the component
  const settings = loadSettings();

  // Use the settings in your existing game logic
  const playerName = settings?.name || "Player";

  return (
    <>
      <header>
        <h2>Tic-Tac-Toe</h2>
      </header>
      <PlayerInfoCard playerName={playerName} />
      <div className="tic-tac-toe-game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="tic-tac-toe-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}
