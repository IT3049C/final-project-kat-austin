/**
 * @param {object} props
 * @param {(roomCode: string | null) => void} props.onSubmitRoomId
 */
export function Multiplayer({
  onCreateRoom,
  initialState,
  roomId,
  onSubmitRoomId,
}) {
  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const { roomCode } = Object.fromEntries(new FormData(form).entries());
    console.log("Submitted room code is: " + roomCode);

    onSubmitRoomId(roomCode.toString().trim() || null);
  }

  return (
    <section className="card">
      {!roomId ? (
        <button onClick={() => onCreateRoom(initialState)}>Create Room</button>
      ) : (
        <p>
          Room Code: <code>{roomId}</code>
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="room-code">
          Join a Room
          <input
            id="room-code"
            name="roomCode"
            aria-label="Room code"
            placeholder="Room Code"
            // onChange={(e) => setRoomId(e.target.value.trim() || null)}
          />
        </label>
      </form>
    </section>
  );
}
