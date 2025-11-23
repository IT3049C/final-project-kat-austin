// import { avatars } from "../../logic/avatars";

export function PlayerInfoCard({ playerName, /*playerAvatar*/ }) {
  //console.log(playerAvatar);
  return (
    <section aria-labelledby="player-info-heading" className="card">
      <h3 id="player-info-heading">Player Info</h3>
      <div role="status" aria-live="polite" data-testid="greeting">
        {playerName ? `Welcome ${playerName}!` : null}
      </div>
      {/* <div className="player-avatar">
        <img
          id="current-avatar"
          src={avatars.find((a) => a.key === playerAvatar).image}
          alt="Player avatar"
        />
        <span id="player-name">{playerName}</span>
      </div> */}
    </section>
  );
}
