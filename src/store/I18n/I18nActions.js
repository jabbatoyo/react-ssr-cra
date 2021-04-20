import {I18N_LOCALE_CHANGED} from './I18nReducer';

export const changeLocale = locale => async dispatch => {
  dispatch({
    type: I18N_LOCALE_CHANGED,
    locale: locale,
  });
};
