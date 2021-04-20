import fs from "fs";
import path from "path";
import url from "url";
import React from "react";
import Helmet from "react-helmet";
import { renderToNodeStream } from "react-dom/server";
import cookie from "react-cookies";
import { Cookies } from "react-cookie-banner";
import queryString from "query-string";
import { setLocale } from "@foes/react-i18n-routing/dist/common/locale";
import Loadable from "react-loadable";
import createStore from "./../src/store/store";
import routes from "./../src/routing/config";
import i18n from "./../src/i18n";
import App from "./../src/App";
import DataProvider from "./../src/routing/DataProvider";

let manifestFile = [];

import("./../build/asset-manifest.json")
  .then((assetManifest) => {
    manifestFile = assetManifest.default;
  })
  .catch(() => {});

const INDEX_HTML = process.env.INDEX_HTML || "./../build/index.html";

const extractFilesByExtension = (manifest, chunks, extension) =>
  Object.keys(manifest)
    .filter((c) => chunks.indexOf(c.replace(`.${extension}`, "")) > -1)
    .map((a) => manifest[a]);

const extractAssets = (manifest, chunks) => {
  const jsFiles = extractFilesByExtension(manifest, chunks, "js");
  const cssFiles = extractFilesByExtension(manifest, chunks, "css");

  return [jsFiles, cssFiles];
};

export default (req, res) => {
  const userAgent = req.headers["user-agent"];
  cookie.plugToRequest(req, res);
  const cookies = new Cookies(req.headers.cookie);
  const pathAndSearch = `${req.path}?${queryString.stringify(req.query)}`;
  const hostname = req.get("x-forwarded-host") || req.hostname;
  const locale = i18n.localeFromLocation(
    url.parse(`${req.protocol}://${hostname}${req.originalUrl}`)
  );
  setLocale(locale);

  const { store, history } = createStore({
    path: pathAndSearch,
  });

  const i18nRoutes = i18n.renderRoutes(routes, locale);
  const fetchData = DataProvider.fetch({
    i18nRoutes: i18nRoutes,
    dispatch: store.dispatch,
  })(req.path, req.query);
  fetchData
    .then(async () => {
      const context = {};
      const modules = [];
      const stream = renderToNodeStream(
        <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
          <App
            cookies={cookies}
            history={history}
            locale={locale}
            location={pathAndSearch}
            routerContext={context}
            store={store}
          />
        </Loadable.Capture>
      );

      const [jsFiles, cssFiles] = extractAssets(manifestFile, modules);

      if (context.status === 301 || context.status === 302) {
        return res.redirect(context.status, context.url);
      }

      if (context.status && context.status !== 200) {
        res.status(context.status);
      }

      const serializedState = JSON.stringify(store.getState());
      const helmet = Helmet.renderStatic();

      res.send(
        fs
          .readFileSync(path.resolve(__dirname, INDEX_HTML), "utf8")
          .replace('<div id="root"></div>', `<div id="root">${stream}</div>`)
          .replace(
            '<script id="state"></script>',
            `<script id="state">window.__PRELOADED_STATE__ = ${serializedState}</script>`
          )
          .replace("<html>", `<html ${helmet.htmlAttributes.toString()}>`)
          .replace(
            '<script id="helmet"></script>',
            `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`
          )
          .replace(
            '<link id="css-bundle-files"/>',
            `${cssFiles
              .map((cssFile) => `<link rel="stylesheet" href="${cssFile}"/>`)
              .join("\\n")}`
          )
          .replace(
            `<script id="js-bundle-files"></script>`,
            `${jsFiles
              .map((jsFile) => `<script src="${jsFile}"></script>`)
              .join("\\n")}`
          )
      );
    })
    .catch((error) => {
      // pm2 will automatically handle this console.error
      console.error(error);

      res.status(500);
      // TODO custom html for project! edit error.html!
      res.sendFile("error.html", {
        root: `${__dirname}/views`,
      });
    });
};
