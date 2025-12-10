import { useState, useEffect } from "react";
import {
  initializeGame,
  guessLetter,
  getDisplayWord,
} from "../../logic/hangman";
import HangmanBoard from "./HangmanBoard";
import WordDisplay from "./WordDisplay";
import LetterButtons from "./LetterButtons";
import GameStatus from "./GameStatus";
import { GameHeader } from "../GameHeader";
import { loadSettings } from "../../logic/storage";

export default function HangmanGame() {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    setGameState(initializeGame());
  }, []);

  const handleGuess = (letter) => {
    setGameState((prevState) => guessLetter(prevState, letter));
  };

  const handleNewGame = () => {
    setGameState(initializeGame());
  };

  if (!gameState) return <p>Loading...</p>;

  const displayWord = getDisplayWord(gameState.word, gameState.guessedLetters);

  const settings = loadSettings();
  const playerName = settings?.name || "Player";

  return (
    <>
      <GameHeader gameName="Hangman" playerName={playerName} />
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
    </>
  );
}
