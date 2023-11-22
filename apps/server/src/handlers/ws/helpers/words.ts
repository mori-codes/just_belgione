import { Word } from '@just-belgione/types';

const getRandomWord = () => {
  const word: Word = ['Plátano', 'Casa', 'Café', 'Cafetera', 'Cafetería'][
    Math.floor(Math.random() * 5)
  ];
  return word;
};

export { getRandomWord };
