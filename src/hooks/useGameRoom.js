// Code from 
// https://uc.instructure.com/courses/1807548/pages/simulating-multiplayer-games-with-the-games-room-api
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCreateRoom, apiGetRoom, apiUpdateRoom } from "../utils/gameRoom";

/**
 * @param {object} options
 * @param {number | undefined} options.refetchInterval
 */
export function useGameRoom(options) {
  const [roomId, setRoomId] = useState(/**@type {string | null}*/ (null));
  const qc = useQueryClient();

  const {
    data: state,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => apiGetRoom(roomId).then((room) => room.gameState),
    enabled: !!roomId,
    refetchInterval: options?.refetchInterval ?? 800,
  });

  const createRoom = useMutation({
    mutationFn: apiCreateRoom,
    onSuccess: ({ roomId: rId, gameState }) => {
      setRoomId(rId);
      qc.setQueryData(["room", rId], gameState);
    },
  });

  const pushState = useMutation({
    mutationFn: async (next) => {
      if (!roomId) throw new Error("No room");
      const latest = await apiGetRoom(roomId);
      const version = (latest.gameState?.version ?? 0) + 1;
      const merged = { ...next, version };
      const updated = await apiUpdateRoom(roomId, merged);
      return updated.gameState;
    },
    onSuccess: (gameState) => {
      if (roomId) qc.setQueryData(["room", roomId], gameState);
    },
  });

  return {
    roomId,
    state,
    isLoading,
    error,
    setRoomId,
    createRoom: (initialState) => createRoom.mutateAsync(initialState),
    pushState: (next) => pushState.mutateAsync(next),
  };
}
