import { defaultUrl, getCanonical } from "./url";

/*
  Full list of possible props:
  ----------------------------
  locale
  canonicalUrl
  googleSiteVerification
  schema
  title
  fullTitle
  defaultTitle
  description
  keywords
  image
  contentType
  noCrawl
  published
  updated
  category
  tags
  twitterUser
  pathname
  opengraph
  twitter
 */

const defaultDescription = "";
const defaultTwitter = "@lin3s";
const defaultImage = `/img/grocasa_og_logo.png`;
const defaultSep = " | ";

const strategy = intl => {
  const siteName = intl.formatMessage({ id: "site.title" });

  return {
    canonicalUrl: ({ canonical, location }) =>
      canonical || getCanonical(location.pathname),
    title: ({ fullTitle, title }) =>
      fullTitle
        ? fullTitle
        : title
        ? `${title}${defaultSep}${siteName}`
        : siteName,
    description: ({ description }) =>
      description ? description.substring(0, 180) : defaultDescription,
    schema: ({ schema }) => schema || "WebPage",
    twitterUser: ({ twitterUser }) => twitterUser || defaultTwitter,
    image: ({ image }) => (image ? image : `${defaultUrl()}${defaultImage}`),
    keywords: ({ keywords }) => (keywords ? keywords : ``)
  };
};

export default strategy;
