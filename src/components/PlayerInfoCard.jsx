export function PlayerInfoCard({ playerName }) {
  return (
    <section aria-labelledby="player-info-heading" className="card">
      <h2 id="player-info-heading">Player Info</h2>
      <div role="status" aria-live="polite" data-testid="greeting">
        {playerName ? `Welcome ${playerName}!` : null}
      </div>
    </section>
  );
}
