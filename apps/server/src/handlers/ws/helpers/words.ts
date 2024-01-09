import { Difficulty, Word, AvailableLanguages } from '@just-belgione/types';
import easyWords from '../../words/easy/words.json' with {type: "json"};
import easyWordsEnglish from '../../words/easy/words.english.json' with {type: "json"};
import normalWords from "../../words/medium/words.json" with {type: "json"}
import hardWords from "../../words/hard/words.json" with {type: "json"}
import veryHardWords from "../../words/very_hard/words.json" with {type: "json"}
import allWords from "../../words/all/words.json" with {type: "json"}
import mAndPWords from "../../words/m&p/words.json" with {type: "json"}

const getRandomWordsFromList = (list: Word[]) =>
  list[Math.floor(Math.random() * list.length)];

const getRandomWord = (difficulty: Difficulty, language: AvailableLanguages): Word => {
  let words = easyWords;
  switch (difficulty) {
    case 'easy':
      words = language === "spanish" ? easyWords : easyWordsEnglish;
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
