import { Hint } from '@just-belgione/types';

type Props = {
  hints: Hint[];
  playerGuessing: string;
};

const WaitingForGuess = ({ playerGuessing }: Props) => {
  return <div>Esta adivinando {playerGuessing}</div>;
};

export { WaitingForGuess };
