import { useState, useEffect } from 'react';
import { initializeGame, guessLetter, getDisplayWord } from '../../logic/hangman';
import HangmanBoard from './HangmanBoard';
import WordDisplay from './WordDisplay';
import LetterButtons from './LetterButtons';
import GameStatus from './GameStatus';

export default function HangmanGame() {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    setGameState(initializeGame());
  }, []);

  const handleGuess = (letter) => {
    setGameState(prevState => guessLetter(prevState, letter));
  };

  const handleNewGame = () => {
    setGameState(initializeGame());
  };

  if (!gameState) return <div>Loading...</div>;

  const displayWord = getDisplayWord(gameState.word, gameState.guessedLetters);

  return (
    <div className="hangman-game">
      <h1>Hangman</h1>
      
      <HangmanBoard attempts={gameState.attempts} />
      
      <WordDisplay word={displayWord} />
      
      <GameStatus 
        gameOver={gameState.gameOver}
        won={gameState.won}
        word={gameState.word}
        attempts={gameState.attempts}
      />
      
      <LetterButtons 
        guessedLetters={gameState.guessedLetters}
        onGuess={handleGuess}
        disabled={gameState.gameOver}
      />
      
      {gameState.gameOver && (
        <button onClick={handleNewGame} className="new-game-btn">
          New Game
        </button>
      )}
    </div>
  );
}