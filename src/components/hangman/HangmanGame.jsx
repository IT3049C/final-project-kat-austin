import { useState, useEffect } from 'react';
import { initializeGame, guessLetter, getDisplayWord } from '../../logic/hangman';
import { useGameRoom } from '../../hooks/useGameRoom'; 
import Multiplayer from '../Multiplayer';
import HangmanBoard from './HangmanBoard';
import WordDisplay from './WordDisplay';
import LetterButtons from './LetterButtons';
import GameStatus from './GameStatus';

export default function HangmanGame() {
  const [mode, setMode] = useState('single'); 
  const [gameState, setGameState] = useState(null);
  const [roomId, setRoomId] = useState(null); 

  const { state: gameRoomState, createRoom, pushState, setRoomId: setHookRoomId } = useGameRoom();

  useEffect(() => {
    if (mode === 'single') {
      setGameState(initializeGame());
    } else if (mode === 'multi' && gameRoomState) {
      setGameState(gameRoomState);
    }
  }, [mode, gameRoomState]);

  const handleGuess = async (letter) => {
    if (mode === 'single') {
      setGameState(prevState => guessLetter(prevState, letter));
    } else if (mode === 'multi') {
      const nextState = guessLetter(gameState, letter);
      await pushState(nextState); 
    }
  };

  const handleNewGame = async () => {
    const newState = initializeGame();
    if (mode === 'single') {
      setGameState(newState);
    } else if (mode === 'multi') {
      await pushState(newState); 
    }
  };

  const toggleMode = () => {
    if (mode === 'single') {
      setMode('multi');
    } else {
      setMode('single');
      setHookRoomId(null); // "Leave" room
      setRoomId(null);
      setGameState(initializeGame());
    }
  };

  const handleCreateRoom = async (initialState) => {
    const { roomId: newRoomId } = await createRoom(initialState);
    setRoomId(newRoomId);
  };

  if (!gameState && mode === 'single') return <div>Loading...</div>;

  const displayWord = mode === 'single' ? getDisplayWord(gameState.word, gameState.guessedLetters) : 
                     (gameRoomState ? getDisplayWord(gameRoomState.word, gameRoomState.guessedLetters) : null);

  return (
    <div className="hangman-game">
      <h1>Hangman</h1>
      
      <div className="mode-toggle">
        <button onClick={toggleMode}>
          Switch to {mode === 'single' ? 'Multiplayer' : 'Single Player'}
        </button>
      </div>
      
      {mode === 'single' ? (
        <>
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
      ) : (
        <>
          <Multiplayer 
            onCreateRoom={handleCreateRoom}
            initialState={initializeGame()}
            roomId={roomId}
            setRoomId={(id) => { setHookRoomId(id); setRoomId(id); }} // Sync with hook
          />
          {roomId && gameRoomState && (
            <>
              <HangmanBoard attempts={gameRoomState.attempts} />
              <WordDisplay word={displayWord} />
              <GameStatus 
                gameOver={gameRoomState.gameOver}
                won={gameRoomState.won}
                word={gameRoomState.word}
                attempts={gameRoomState.attempts}
              />
              <LetterButtons 
                guessedLetters={gameRoomState.guessedLetters}
                onGuess={handleGuess}
                disabled={gameRoomState.gameOver}
              />
              {gameRoomState.gameOver && (
                <button onClick={handleNewGame} className="new-game-btn">
                  New Game
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}