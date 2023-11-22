import { ActiveGames, Room, Word } from '@just-belgione/types';
import { getRoom, updateRoundsWithGuess } from '../../../db/rooms.ts';
import { notifyAll } from './notify.ts';

const normalizeWord = (word: Word): Word => {
  // Remove accent marks and upper case letters.
  return word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

const isGuessCorrect = (wordToGuess: Word, wordGuessed: Word): boolean => {
  // TODO: So something smart to check that the words match.
  // E.g.: SpaCy lemmatization.
  return normalizeWord(wordToGuess) === normalizeWord(wordGuessed);
};

const guess = async (
  activeGames: ActiveGames,
  roomId: Room['_id'],
  wordGuessed: Word
) => {
  const room = await getRoom(roomId);
  if (!room || !room.currentRound) throw new Error('Room invalid');
  if (!room.currentRound?.wordToGuess)
    throw new Error("Current rounds doesn't have a word to guess");

  const wordToGuess = room.currentRound.wordToGuess;
  const correct = isGuessCorrect(wordToGuess, wordGuessed);
  await updateRoundsWithGuess(roomId, wordGuessed, correct);

  const gamePoints = room.rounds.filter(({ correct }) => correct).length;
  notifyAll(activeGames, roomId, {
    type: 'roundResult',
    status: 'PLAYING',
    data: {
      guess: wordGuessed,
      correct,
      wordToGuess,
      roundIndex: room.rounds.length,
      gamePoints,
    },
  });
};

export { guess };
