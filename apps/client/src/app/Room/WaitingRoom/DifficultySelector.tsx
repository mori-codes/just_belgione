import { Difficulty } from '@just-belgione/types';
import React from 'react';

// TODO: I didn't manage to "convert Difficulty to string",
type DifficultyOption = {
  difficulty: Difficulty;
  label: string;
  color: string;
};

const difficulties: Array<DifficultyOption> = [
  { difficulty: 'easy', label: '1', color: 'bg-jo-green' },
  { difficulty: 'normal', label: '2', color: 'bg-jo-main' },
  { difficulty: 'hard', label: '3', color: 'bg-jo-main' },
  { difficulty: 'veryHard', label: '4', color: 'bg-jo-red' },
  { difficulty: 'all', label: '5', color: 'bg-jo-red' },
  { difficulty: 'm&p', label: '⭐', color: 'bg-jo-purple' },
];

type Props = {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
};

const DifficultySelector: React.FC<Props> = ({ difficulty, setDifficulty }) => {
  const indexSelected = difficulties.findIndex(
    (dif) => dif.difficulty === difficulty
  );

  return (
    <div className="w-full flex h-[50px] rounded-sm overflow-hidden text-white shadow-lg">
      {difficulties.map(({ difficulty, label, color }, index) => (
        <button
          key={difficulty}
          onClick={() => setDifficulty(difficulty)}
          className={`${
            index <= indexSelected ? color : 'bg-jo-black/25'
          } flex items-center justify-center grow text-jo-sm transition-all`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export { DifficultySelector };
