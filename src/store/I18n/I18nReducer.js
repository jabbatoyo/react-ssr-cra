export const I18N_LOCALE_CHANGED = 'I18N_LOCALE_CHANGED';

const initialState = {
  locale: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case I18N_LOCALE_CHANGED:
      return {
        ...state,
        locale: action.locale,
      };

    default:
      return state;
  }
};

export const getLocale = state => state.locale;
