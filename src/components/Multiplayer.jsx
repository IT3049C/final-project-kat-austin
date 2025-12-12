export function Multiplayer({ onCreateRoom, initialState, roomId, setRoomId }) {
  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const { roomCode } = Object.fromEntries(new FormData(form).entries());
    console.log("Submitted room code is: " + roomCode);

    setRoomId(roomCode.toString().trim() || null);
  }

  return (
    <section className="card">
      {!roomId && (
        <button onClick={() => onCreateRoom(initialState)}>Create Room</button>
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
      {roomId && (
        <p>
          Room Code: <code>{roomId}</code>
        </p>
      )}
    </section>
  );
}
