import { Player } from '@just-belgione/types';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const userAtom = atomWithStorage<Player>('user', '');

const useUser = () => {
  return useAtom(userAtom);
};

export { useUser };
