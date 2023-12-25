import { ActiveGames, Difficulty, Player, Room } from '@just-belgione/types';
import { notifyAll } from './notify.ts';
import { updateGameStatus, createRound, getRoom } from '../../../db/rooms.ts';
import { getRandomWord } from './words.ts';

// Total number of rounds has to be equal to the number of players times 2.
const getTotalRounds = (players: Player[]) => {
  return players.length * 2;
};

const startRound = async (
  activeGames: ActiveGames,
  roomId: Room['_id'],
  difficulty: Difficulty
): Promise<void> => {
  const room = await getRoom(roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  const { players, rounds, status, currentRound } = room;
  const isLastRound = rounds.length + 1 === getTotalRounds(players);

  if (isLastRound) {
    await updateGameStatus(roomId, 'FINISHED');
    const room = await getRoom(roomId);

    if (!room)
      throw new Error('Room not found while trying to finish the game');

    notifyAll(activeGames, roomId, {
      type: 'gameOver',
      status: 'FINISHED',
      data: {
        room,
      },
    });

    for (const socket of Object.values(activeGames[roomId].playerSockets)) {
      socket.close(3000, 'Game finished');
    }
    delete activeGames[roomId];

    return
  }

  const isFirstRound = currentRound === undefined;
  const playerGuessingIndex = isFirstRound
    ? 0 // The player who created the room will be the first one guessing
    : (rounds.length + 1) % players.length;

  const playerGuessing = Object.keys(activeGames[roomId].playerSockets)[
    playerGuessingIndex
  ];
  const wordToGuess = getRandomWord(difficulty);

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
      difficulty,
    },
  });
};

export { startRound };
