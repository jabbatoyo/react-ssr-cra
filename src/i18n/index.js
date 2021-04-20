import {addLocaleData} from 'react-intl';
import {defaultUnPrefixed} from '@foes/react-i18n-routing';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import routes from './../routing/routes';

import messagesEs from './messages/es.json';
import messagesEn from './messages/en.json';

const locales = ['es', 'en'];
const defaultLocale = 'es';

const languageStrategy = defaultUnPrefixed({routes, locales, defaultLocale});
const defaultTranslatedRoutes = {
  es: '/',
  en: '/en',
};
const localePrefix = locale => (locale === defaultLocale ? '' : `/${locale}`);
const prependLocale = (locale, slug) =>
  slug.indexOf(localePrefix(locale)) === 0 ? slug : `${localePrefix(locale)}${slug}`;
const localeAndPathFromUrl = url => {
  // Hacky monkey patch.
  // ReactI18nRouting library's localeFromLocation method expects a "location" shaped object.
  const locale = languageStrategy.localeFromLocation({pathname: url});
  const path = url
    .split('/')
    .filter(segment => segment !== '')
    .filter((segment, index) => !(index === 0 && segment === locale))
    .join('/');

  return {locale: locale, path: `/${path}`};
};

addLocaleData([...en, ...es]);
const messages = {
  es: messagesEs,
  en: messagesEn,
};

export default {
  defaultTranslatedRoutes: defaultTranslatedRoutes,
  formatIntlRoute: languageStrategy.formatIntlRoute,
  localeFromLocation: languageStrategy.localeFromLocation,
  defaultLocale: defaultLocale,
  localePrefix: localePrefix,
  prependLocale: prependLocale,
  locales: locales,
  localeAndPathFromUrl: localeAndPathFromUrl,
  messages: messages,
  renderRoutes: (config, locale) => languageStrategy.renderRoutes(locale)(config),
};
