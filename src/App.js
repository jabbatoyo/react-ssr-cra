import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { ConnectedRouter } from "connected-react-router";
import { StaticRouter } from "react-router";
import { renderRoutes } from "react-router-config";
import { CookiesProvider } from "react-cookie-banner";
import { I18nRoutingProvider, withI18nRouting } from "@foes/react-i18n-routing";
import { setLocale } from "@foes/react-i18n-routing/dist/common/locale";
import RouteDataLoader from "./routing/ui/RouteDataLoader";

import isSSR from "./config/isSSR";
import i18n from "./../src/i18n";
import routes from "./routing/config";
import DataProvider from "./routing/DataProvider";

const ClientRouterAndIntlProvider = ({
  children,
  history,
  i18nRoutes,
  dispatch,
}) => (
  <ConnectedRouter history={history}>
    <RouteDataLoader
      fetch={DataProvider.fetch({ i18nRoutes, dispatch })}
      fetchAfterSSR={DataProvider.fetchAfterSSR({ i18nRoutes, dispatch })}
    >
      {children}
    </RouteDataLoader>
  </ConnectedRouter>
);

const ServerRouterAndIntlProvider = ({ children, context, location }) => (
  <StaticRouter context={context} location={location}>
    {children}
  </StaticRouter>
);

const Router = isSSR()
  ? ServerRouterAndIntlProvider
  : ClientRouterAndIntlProvider;
const LocaleContext = withI18nRouting(({ i18nRouting, children }) =>
  children(i18nRouting.locale)
);

export default ({ cookies, history, location, routerContext, store }) => (
  <Provider store={store}>
    <I18nRoutingProvider
      defaultTranslatedRoutes={i18n.defaultTranslatedRoutes}
      formatIntlRoute={i18n.formatIntlRoute}
      history={history}
      localeFromPath={i18n.localeFromLocation}
    >
      <CookiesProvider cookies={cookies}>
        <LocaleContext>
          {(locale) => {
            setLocale(locale);
            const i18nRoutes = i18n.renderRoutes(routes, locale);

            return (
              <IntlProvider
                formats={{ formatIntlRoute: i18n.formatIntlRoute }}
                locale={locale}
                messages={i18n.messages[locale]}
              >
                <Router
                  context={routerContext}
                  dispatch={store.dispatch}
                  history={history}
                  i18nRoutes={i18nRoutes}
                  location={location}
                >
                  {renderRoutes(i18nRoutes)}
                </Router>
              </IntlProvider>
            );
          }}
        </LocaleContext>
      </CookiesProvider>
    </I18nRoutingProvider>
  </Provider>
);
