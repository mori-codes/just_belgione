import { Difficulty } from '@just-belgione/types';
import React from 'react';

// TODO: I didn't manage to "convert Difficulty to string",
const difficultyTranslation: Map<Difficulty, string> = new Map([
  ['easy', 'Fácil'],
  ['normal', 'Normal'],
  ['hard', 'Difícil'],
  ['veryHard', 'Muy difícil'],
  ['all', 'Todas las palabras'],
  ['m&p', 'm&p'],
]);

type Props = {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
};

const DifficultySelector: React.FC<Props> = ({ difficulty, setDifficulty }) => {
  const handleDifficultyChange: React.ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    setDifficulty(value as Difficulty);
  };
  return (
    <div>
      <p>Elige la dificultad de la partida</p>
      <select name="select" onChange={handleDifficultyChange}>
        {[...difficultyTranslation].map(([dif, translation]) => (
          <option value={dif}>{translation}</option>
        ))}
      </select>
    </div>
  );
};

export { DifficultySelector };
