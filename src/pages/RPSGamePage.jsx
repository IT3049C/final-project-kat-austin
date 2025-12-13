import { GameHeader } from "../components/GameHeader";
import { GameSection } from "../components/rps-game/GameSection";
import { HighScoresSection } from "../components/rps-game/HighScoresSection";
import { loadSettings } from "../logic/storage";

export function RPSGamePage() {
  const settings = loadSettings();
  const playerName = settings?.name || "Player";
  const difficulty = settings?.difficulty || "normal";

  return (
    <>
      <GameHeader gameName="Rock Paper Scissors" playerName={playerName} />
      <GameSection difficulty={difficulty} />
      <HighScoresSection />
    </>
  );
}
