// Code from
// https://uc.instructure.com/courses/1807548/pages/simulating-multiplayer-games-with-the-games-room-api

const BASE = "https://game-room-api.fly.dev";

/**
 * Creates a new room on the server.
 * @returns {Promise<{ roomId: string; gameState: any }} The newly created room
 * and its state.
 */
export async function apiCreateRoom(initialState) {
  const res = await fetch(`${BASE}/api/rooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initialState }),
  });
  if (!res.ok) throw new Error("Failed to create room");
  return res.json();
}

/**
 * Reads an existing room on the server.
 * @param {string} roomId the id of the room you want to read.
 * @returns {Promise<{ id: string; gameState: any }>}
 */
export async function apiGetRoom(roomId) {
  const res = await fetch(`${BASE}/api/rooms/${roomId}`);
  if (!res.ok) throw new Error("Room not found");
  return res.json();
}

/**
 * Updates an existing room on the server.
 * @param {string} roomId The id of the room you want to update.
 * @returns {Promise<{ id: string; gameState: any }>} The updated room object.
 */
export async function apiUpdateRoom(roomId, gameState) {
  const res = await fetch(`${BASE}/api/rooms/${roomId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameState }),
  });
  if (!res.ok) throw new Error("Failed to update room");
  return res.json();
}

/**
 * Meant to prevent conflicts between players games.
 * @param {string} roomId The ID of the room to update.
 * @param {*} localState The local game state.
 * @param {*} pushState The pushState function from the useGameHook.
 * @returns The latest game state from the server if version doesn't match, or 
 * the result of updating the room.
 */
export async function safePush(roomId, localState, pushState) {
  const latest = await apiGetRoom(roomId);

  if ((latest.gameState.version ?? 0) !== (localState.version ?? 0)) {
    // Someone else moved. merge or ask user to retry
    return latest.gameState;
  }
  return pushState(localState);
}
