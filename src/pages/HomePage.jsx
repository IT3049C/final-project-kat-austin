import { useState, useEffect } from "react";
import { loadSettings, saveSettings } from "../logic/storage";

export function HomePage() {
  const [playerName, setPlayerName] = useState("");
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    const settings = loadSettings();
    setPlayerName(settings?.name || "");
    setInputName(settings?.name || "");
  }, []);

  const handleSaveName = () => {
    saveSettings({ name: inputName });
    setPlayerName(inputName);
  };

  return (
    <>
      <header>
        <h2>Welcome to GameHub</h2>
      </header>
      <section className="player-name-section card">
        <h3>Player Settings</h3>
        <label htmlFor="player-name">
          Your Name:
          <input
            id="player-name"
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter your username"
          />
        </label>
        <button onClick={handleSaveName}>Save Name</button>
        {playerName && (
          <p>
            Current name: <strong>{playerName}</strong>
          </p>
        )}
      </section>
      <section className="developer-section card">
        <h3>Developers</h3>
        <p>Austin Schnee</p>
        <p>Khadeeja Tunkara</p>
      </section>
    </>
  );
}
