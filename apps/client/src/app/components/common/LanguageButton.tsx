import { useLocalization } from '../../atoms/localizationAtom';
import { Language } from '../icons/Language';

// Right now we only have two languages, so it will be a toggle. In the future we might need to add a modal
const LanguageButton = () => {
  const { setLocale } = useLocalization();
  const changeLocale = () => {
    setLocale((prev) => (prev === 'spanish' ? 'english' : 'spanish'));
  };

  return (
    <button name="Change language" onClick={changeLocale}>
      <Language className="w-[50px] h-[50px] text-white drop-shadow-lg"/>
    </button>
  );
};

export { LanguageButton };
