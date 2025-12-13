export function Moves({ history, jumpTo }) {
  return (
    <ol>
      {history.map((_squares, move) => (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>
            {move > 0 ? "Go to move #" + move : "Go to game start"}
          </button>
        </li>
      ))}
    </ol>
  );
}
