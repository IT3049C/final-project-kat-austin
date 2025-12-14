import { PlayerInfoCard } from "./PlayerInfoCard";

/**
 * A header that is used on each game page.
 * @param {object} props
 * @param {string} props.gameName
 * @param {string} props.playerName
 */
export function GameHeader({ gameName, playerName }) {
  return (
    <>
      <header>
        <h2>{gameName}</h2>
      </header>
      <PlayerInfoCard playerName={playerName}/>
    </>
  );
}
