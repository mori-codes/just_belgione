import { Difficulty } from '@just-belgione/types';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const difficultyAtom = atomWithStorage<Difficulty>('difficulty', 'easy');

const useDifficulty = () => useAtom(difficultyAtom);

export { useDifficulty };
