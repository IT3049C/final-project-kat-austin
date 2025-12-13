/**
 * @param {object} props
 * @param {"single" | "multi"} props.mode
 * @param {React.MouseEventHandler<HTMLButtonElement>} props.onToggleMode
 */
export function ModeToggleButton({mode, onToggleMode}) {
  return (
    <div className="mode-toggle">
      <button onClick={onToggleMode}>
        Switch to {mode === "single" ? "Multiplayer" : "Single Player"}
      </button>
    </div>
  );
}
