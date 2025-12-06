export default function GameStatus({ gameOver, won, word, attempts }) {
  return (
    <div className="game-status">
      <p>Attempts remaining: <strong>{attempts}</strong></p>

      {gameOver ? (
        <div className="result">
          {won ? (
            <p className="won">You won! </p>
          ) : (
            <p className="lost">You lost. The word was <strong>{word}</strong></p>
          )}
        </div>
      ) : (
        <p className="playing">Guess a letter to continue playing.</p>
      )}
    </div>
  );
}