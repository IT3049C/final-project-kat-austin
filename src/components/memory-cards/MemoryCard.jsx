/**
 * @param {object} props
 * @param {string} props.icon
 * @param {boolean} props.revealed
 * @param {MouseEventHandler<HTMLButtonElement>} props.onClick
 */
export function MemoryCard({ icon, onClick, revealed = false }) {
  return (
    <button
      className={revealed ? "memory-card" : "memory-card-hidden"}
      onClick={onClick}
    >
      {revealed ? <p>{icon}</p> : <p></p>}
    </button>
  );
}
