const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function LetterButtons({ guessedLetters, onGuess, disabled }) {
  return (
    <div className="letter-buttons">
      {ALPHABET.map(letter => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessedLetters.includes(letter) || disabled}
          className={guessedLetters.includes(letter) ? 'guessed' : ''}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}