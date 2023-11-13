import { ActiveGames, Room } from '@just-belgione/types';
import { notifyAll } from './notify.ts';
import { updateGameStatus, createRound } from '../../../db/rooms.ts';
import { getRandomWord } from './words.ts';

const startGame = async (activeGames: ActiveGames, roomId: Room['_id']) => {
  const playerGuessing = Object.keys(activeGames[roomId].playerSockets)[0]; // The player who created the room will be the first one guessing.
  const wordToGuess = getRandomWord();

  // Update the database.
  await updateGameStatus(roomId, 'PLAYING');
  await createRound(roomId, playerGuessing, wordToGuess);
  activeGames[roomId].status = 'PLAYING';

  // Notify all.
  notifyAll(activeGames, roomId, {
    type: 'newRound',
    status: 'PLAYING',
    data: {
      round: {
        playerGuessing,
        wordToGuess,
        hints: [],
      },
    },
  });
};

export { startGame };
