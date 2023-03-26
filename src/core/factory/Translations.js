import English from "@translations/adapters/English";
import Spanish from "@translations/adapters/Spanish";
import { LANGS } from "@constants";

const TranslationFactory = (language = '') => {
  if (language === LANGS.en) {
    return new English();
  }
  if (language === LANGS.es) {
    return new Spanish();
  }
  return new English();
}

export default TranslationFactory;
