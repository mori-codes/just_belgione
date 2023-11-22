import { ActiveGames, Hint, Room } from '@just-belgione/types';
import { getRoom, saveHints } from '../../../db/rooms.ts';
import { notifyAll } from './notify.ts';

const validateHints = (hints: Hint[]): Hint[] => {
  // TODO: Implement some smart way of verifying that the
  // players didn't lie.
  return hints.map((hint) => ({ ...hint, isValid: hint.isValid !== false }));
};

const confirmHints = async (
  activeGames: ActiveGames,
  roomId: Room['_id'],
  hints: Hint[]
) => {
  const validatedHints = validateHints(hints);
  await saveHints(roomId, validatedHints);

  const room = await getRoom(roomId);
  if (!room || !room.currentRound) throw new Error('Room invalid');

  const validHints = validatedHints.filter(({ isValid }) => isValid);
  notifyAll(activeGames, roomId, {
    type: 'finalHints',
    status: 'PLAYING',
    data: {
      validHints,
      playerGuessing: room.currentRound.playerGuessing,
    },
  });
};

export { confirmHints };
