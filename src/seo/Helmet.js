import {withRouter} from 'react-router-dom';

import reactIntlHelmet from '../_packages/seo/ui/ReactIntlHelmet';
import strategy from './strategy';

export default withRouter(reactIntlHelmet(strategy));
