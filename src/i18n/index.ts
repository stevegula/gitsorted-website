import en from './en';
import type { Translations } from './en';
import bg from './bg';
import bn from './bn';
import ca from './ca';
import cs from './cs';
import da from './da';
import de from './de';
import el from './el';
import es from './es';
import fi from './fi';
import fr from './fr';
import hi from './hi';
import hr from './hr';
import hu from './hu';
import id from './id';
import it from './it';
import ja from './ja';
import ko from './ko';
import ms from './ms';
import nb from './nb';
import nl from './nl';
import pl from './pl';
import pt from './pt';
import ro from './ro';
import ru from './ru';
import sk from './sk';
import sr from './sr';
import sv from './sv';
import sw from './sw';
import th from './th';
import tl from './tl';
import tr from './tr';
import uk from './uk';
import vi from './vi';
import yue from './yue';
import zh from './zh';

export const locales = [
  'en', 'bg', 'bn', 'ca', 'cs', 'da', 'de', 'el', 'es', 'fi',
  'fr', 'hi', 'hr', 'hu', 'id', 'it', 'ja', 'ko', 'ms', 'nb',
  'nl', 'pl', 'pt', 'ro', 'ru', 'sk', 'sr', 'sv', 'sw', 'th',
  'tl', 'tr', 'uk', 'vi', 'yue', 'zh',
] as const;

export type Locale = (typeof locales)[number];

export const translations: Record<Locale, Translations> = {
  en, bg, bn, ca, cs, da, de, el, es, fi,
  fr, hi, hr, hu, id, it, ja, ko, ms, nb,
  nl, pl, pt, ro, ru, sk, sr, sv, sw, th,
  tl, tr, uk, vi, yue, zh,
};

export type { Translations };
export { en };
