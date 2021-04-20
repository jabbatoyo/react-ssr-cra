import React from 'react';
import {connect} from 'react-redux';

import {changeLocale} from './I18nActions';

class I18nListener extends React.PureComponent {
  state = {
    locale: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.locale !== state.locale) {
      props.dispatch(changeLocale(props.locale));
      return {locale: props.locale};
    }

    return state;
  }

  render() {
    return this.props.children;
  }
}

export default connect()(I18nListener);
