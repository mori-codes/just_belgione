import { ActiveGames, Room } from '@just-belgione/types';
import { notifyAll } from './notify.ts';
import { updateGameStatus, createRound, getRoom } from '../../../db/rooms.ts';
import { getRandomWord } from './words.ts';

const startRound = async (activeGames: ActiveGames, roomId: Room['_id']) => {
  const room = await getRoom(roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  const { players, rounds, status, currentRound } = room;
  const isFirstRound = currentRound === undefined;
  const playerGuessingIndex = isFirstRound
    ? 0 // The player who created the room will be the first one guessing
    : (rounds.length + 1) % players.length;
  console.log(playerGuessingIndex);

  const playerGuessing = Object.keys(activeGames[roomId].playerSockets)[
    playerGuessingIndex
  ];
  const wordToGuess = getRandomWord();

  // Update the database.
  if (status === 'WAITING') {
    await updateGameStatus(roomId, 'PLAYING');
    activeGames[roomId].status = 'PLAYING';
  }

  await createRound(roomId, playerGuessing, wordToGuess, currentRound);

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

export { startRound };
