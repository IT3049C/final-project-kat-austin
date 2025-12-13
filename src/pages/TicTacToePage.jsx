import { useState } from "react";
import { loadSettings } from "../logic/storage";
import { GameHeader } from "../components/GameHeader";
import { Board } from "../components/tic-tac-toe/Board";
import { useGameRoom } from "../hooks/useGameRoom";
import { calculateWinner } from "../logic/ticTacToe";
import { Multiplayer } from "../components/Multiplayer";

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
  // Tracks who joined the room vs created the room
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [loading, setLoading] = useState(false);

  const { roomId, state, isLoading, error, setRoomId, createRoom, pushState } =
    useGameRoom({
      refetchInterval: 1000,
    });

  const xIsNext = state?.turn % 2 === 0;
  const currentSquares = state?.board ?? [];
  const settings = loadSettings();
  const playerName = settings?.name || "Player";

  /**
   * @param {("X" | "O" | null)[]} nextSquares
   */
  function handlePlay(nextSquares) {
    const turnOf = xIsNext ? "O" : "X";
    // Don't let person play if it isn't their turn.
    if (turnOf === "X" && !joinedRoom) return;
    if (turnOf === "O" && joinedRoom) return;

    /** @type {TicTacToeState} */
    const gameState = {
      players: state.players,
      turn: state.turn + 1,
      board: nextSquares,
      winner: calculateWinner(nextSquares),
      version: state.version + 1,
      updatedBy: xIsNext ? "O" : "X",
      updatedAt: Date.now(),
    };
    pushState(gameState);
  }

  if (isLoading) {
    if (!loading) setLoading(true);
    return <p>Loading room...</p>;
  } else if (error) {
    if (loading) setLoading(false);
    console.error(error);
    return <p>{error.message}</p>;
  }

  if (loading) {
    console.log(joinedRoom);
    setJoinedRoom(true);
    setLoading(false);
    pushState({ ...state, players: [...state.players, "O"] });
  }

  return (
    <>
      <GameHeader gameName="Tic-Tac-Toe" playerName={playerName} />
      <Multiplayer
        onCreateRoom={createRoom}
        initialState={{ ...DEFAULT, players: ["X"] }}
        roomId={roomId}
        setRoomId={setRoomId}
      />
      {roomId && (
        <>
          <p>You are {joinedRoom ? "O" : "X"}</p>
          <div className="tic-tac-toe-game">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          </div>
        </>
      )}
    </>
  );
}
