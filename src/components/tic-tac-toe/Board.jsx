import { calculateWinner } from "../../logic/ticTacToe";
import { Square } from "./Square";

/**
 * @param {object} props
 * @param {boolean} props.xIsNext
 * @param {("X" | "O" | null)[]} props.squares
 * @param {(nextSquares: ("X" | "O" | null)[]) => void} props.onPlay
 */
export function Board({ xIsNext, squares, onPlay }) {
  /** @param {number} i */
  function handleClick(i) {
    if (squares?.at(i) || calculateWinner(squares ?? [])) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div className="tic-tac-toe-status">{status}</div>
      <div className="tic-tac-toe-grid">
        {squares?.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </>
  );
}
