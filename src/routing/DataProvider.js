import {matchRoutes} from 'react-router-config';

const fetchWithMethod = method => ({i18nRoutes, dispatch}) => (pathname, search) =>
  Promise.all(
    matchRoutes(i18nRoutes, pathname).reduce(
      (acc, {route, match}) => (method in route ? [...acc, dispatch(route[method](match, {pathname, search}))] : acc),
      [],
    ),
  );

const fetch = fetchWithMethod('loadData');
const fetchAfterSSR = fetchWithMethod('loadDataAfterSSR');

export default {fetch, fetchAfterSSR};
