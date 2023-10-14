import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const userAtom = atomWithStorage('user', '');

const useUser = () => {
  return useAtom(userAtom);
};

export { useUser };
