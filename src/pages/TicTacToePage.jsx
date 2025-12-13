import { useState } from "react";
import { loadSettings } from "../logic/storage";
import { GameHeader } from "../components/GameHeader";
import { Board } from "../components/tic-tac-toe/Board";
import { useGameRoom } from "../hooks/useGameRoom";
import { calculateWinner, checkXNext } from "../logic/ticTacToe";
import { Multiplayer } from "../components/Multiplayer";
import { ModeToggleButton } from "../components/ModeToggleButton";
import { Moves } from "../components/tic-tac-toe/Moves";
import { safePush } from "../utils/gameRoom";

/**
 * @typedef {object} TicTacToeState
 * @property {string[]} players
 * @property {number} turn The number of turns that have elapsed
 * @property {(string | null)[]} board
 * @property {string | null} winner
 * @property {number} version
 * @property {string | null} updatedBy
 * @property {number | null} updatedAt
 */

/** @type {TicTacToeState} */
const DEFAULT = {
  players: [],
  turn: 0,
  board: Array(9).fill(null),
  winner: null,
  version: 0,
  updatedBy: null,
  updatedAt: null,
};

export function TicTacToePage() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const [mode, setMode] = useState("single");

  const { roomId, state, isLoading, error, setRoomId, createRoom, pushState } =
    useGameRoom({
      refetchInterval: 1000,
    });

  const xIsNext =
    mode === "single" ? checkXNext(currentMove) : checkXNext(state?.turn);
  const currentSquares =
    mode === "single" ? history[currentMove] : state?.board ?? [];

  const settings = loadSettings();
  const playerName = settings?.name || "Player";

  /**
   * @param {("X" | "O" | null)[]} nextSquares
   */
  async function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    if (mode === "multi") {
      /** @type {TicTacToeState} */
      const gameState = {
        players: state.players,
        turn: state.turn + 1,
        board: nextSquares,
        winner: calculateWinner(nextSquares),
        version: state?.version ?? 0,
        updatedBy: null,
        updatedAt: Date.now(),
      };
      await safePush(roomId, gameState, pushState);
    }
  }

  function handleToggleMode() {
    if (mode === "single") {
      setMode("multi");
    } else {
      setMode("single");
      setRoomId(null);
    }
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  if (isLoading) {
    return <p>Loading room...</p>;
  } else if (error) {
    console.error(error);
    return <p>{error.message}</p>;
  }

  return (
    <>
      <GameHeader gameName="Tic-Tac-Toe" playerName={playerName} />
      <ModeToggleButton mode={mode} onToggleMode={handleToggleMode} />
      {mode === "multi" && (
        <Multiplayer
          onCreateRoom={createRoom}
          initialState={{ ...DEFAULT, players: ["X"] }}
          roomId={roomId}
          onSubmitRoomId={setRoomId}
        />
      )}
      <div className="tic-tac-toe-game">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <div className="tic-tac-toe-info">
          {mode === "single" && (
            <Moves history={history} jumpTo={(move) => setCurrentMove(move)} />
          )}
        </div>
      </div>
    </>
  );
}
