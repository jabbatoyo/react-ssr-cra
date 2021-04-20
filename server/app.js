import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import ssr from "./middleware";

const BUILD_JS = process.env.BUILD_JS || "./../build";
const BUILD_SITEMAP = process.env.BUILD_SITEMAP || "./../build/sitemap";
const app = express();

try {
  app.use(
    cors({
      origin: [
        new RegExp("^https?://localhost(:[0-9]+)?$"),
        /^https?:\/\/(.*\.)?lin3sdev\./,
      ],
    })
  );
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use("/sitemap", express.static(path.resolve(__dirname, BUILD_SITEMAP)));
  app.get(
    /^(?!\/(api|static|fixtures|img|sitemaps|pdfs|videos|icons|fonts|ltm|manifest\.json|robots.txt|sitemap.xml).*$).*?/,
    ssr
  );

  app.use(express.static(path.resolve(__dirname, BUILD_JS)));
} catch (error) {
  console.log(error);
}

export default app;
