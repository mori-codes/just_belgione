import { ActiveGames, Hint, Room } from "@just-belgione/types";
import { getRoom, saveHints } from "../../../db/rooms.ts";
import { validateHints } from "./confirmHints.ts";
import { notifyAll } from "./notify.ts";

const updateHints = async (
  activeGames: ActiveGames,
  roomId: Room['_id'],
  hints: Hint[]
) => {
  const validatedHints = validateHints(hints);
  await saveHints(roomId, validatedHints);

  const room = await getRoom(roomId);
  if (!room || !room.currentRound) throw new Error('Room invalid');

  notifyAll(activeGames, roomId, {
    type: 'hintReceived',
    status: 'PLAYING',
    data: {
      hints: room.currentRound.hints,
    },
  });
};

export { updateHints };
