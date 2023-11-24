import { Difficulty, Word } from '@just-belgione/types';
import easyWords from '../../words/easy/words.json' with {type: "json"};
import normalWords from "../../words/medium/words.json" with {type: "json"}
import hardWords from "../../words/hard/words.json" with {type: "json"}
import veryHardWords from "../../words/very_hard/words.json" with {type: "json"}
import allWords from "../../words/all/words.json" with {type: "json"}
import mAndPWords from "../../words/m&p/words.json" with {type: "json"}

const getRandomWordsFromList = (list: Word[]) =>
  list[Math.floor(Math.random() * list.length)];

const getRandomWord = (difficulty: Difficulty): Word => {
  let words = easyWords;
  switch (difficulty) {
    case 'easy':
      words = easyWords;
      break;
    case 'normal':
      words = normalWords;
      break;
    case 'hard':
      words = hardWords;
      break;
    case 'veryHard':
      words = veryHardWords;
      break;
    case 'all':
      words = allWords;
      break;
    case 'm&p':
      words = mAndPWords.concat(easyWords);
      break;
  }
  return getRandomWordsFromList(words);
};

export { getRandomWord };
