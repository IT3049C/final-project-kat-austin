//import { capitalize } from "../../utils/string_formatting";

export function MoveButton({ label, onClick }) {
  return (
    <button data-move={label} onClick={onClick}>
      {!label ? "" : label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}
    </button>
  );
}
