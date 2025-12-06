const WORD_LIST = [
  'javascript',
  'banana',
  'programming',
  'orange',
  'hangman',
  'oreo',
  'developer',
  'potato',
  'computer',
  'chocolate',
  'algorithm',
  'burger',
  'function',
  'cheesecake',
  'variable',
  'strawberry',
  'database',
  'milkshake',
  'network'
];

const MAX_ATTEMPTS = 6;

export function initializeGame() {
  const word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toUpperCase();
  return {
    word,
    guessedLetters: [],
    attempts: MAX_ATTEMPTS,
    gameOver: false,
    won: false
  };
}

export function guessLetter(gameState, letter) {
  const upperLetter = letter.toUpperCase();
  
  if (gameState.guessedLetters.includes(upperLetter) || gameState.gameOver) {
    return gameState;
  }

  const newGuessed = [...gameState.guessedLetters, upperLetter];
  const isCorrect = gameState.word.includes(upperLetter);
  const newAttempts = isCorrect ? gameState.attempts : gameState.attempts - 1;
  
  const won = gameState.word.split('').every(letter => newGuessed.includes(letter));
  const gameOver = newAttempts === 0 || won;

  return {
    ...gameState,
    guessedLetters: newGuessed,
    attempts: newAttempts,
    gameOver,
    won
  };
}

export function getDisplayWord(word, guessedLetters) {
  return word.split('').map(letter => 
    guessedLetters.includes(letter) ? letter : '_'
  ).join(' ');
}