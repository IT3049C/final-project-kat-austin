import { GameSection } from "../components/rps-game/GameSection";
import { HighScoresSection } from "../components/rps-game/HighScoresSection";
import { PlayerInfoCard } from "../components/rps-game/PlayerInfoCard";
import { loadSettings } from "../logic/storage";

export function RPSGamePage() {
  // Load settings directly in the component
  const settings = loadSettings();

  // Use the settings in your existing game logic
  const playerName = settings?.name || "Player";
  //const playerAvatar = settings?.avatar;
  const difficulty = settings?.difficulty || "normal";
  
  // console.log(playerAvatar);
  return (
    <main>
      <header>
        <h2>Rock Paper Scissors</h2>
      </header>
      <PlayerInfoCard playerName={playerName} /*playerAvatar={playerAvatar}*/ />
      <GameSection difficulty={difficulty} />
      <HighScoresSection />
    </main>
  );
}
