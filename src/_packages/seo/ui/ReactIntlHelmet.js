import React from 'react';
import {injectIntl} from 'react-intl';

import helmet from './Helmet';

export default strategy =>
  injectIntl(({intl, ...rest}) => {
    const Component = helmet(strategy(intl));

    return <Component {...rest} locale={intl.locale} />;
  });
