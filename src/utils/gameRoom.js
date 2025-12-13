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

