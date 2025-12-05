/**
 * @param {object} props
 * @param {string} props.icon
 * @param {boolean} props.revealed
 */
export function MemoryCard({ icon, revealed }) {
  return (
    <div className="memory-card">
      {revealed && <p>{icon}</p>}
    </div>
  );
}
