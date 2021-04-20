import React from 'react';
import Helmet from 'react-helmet';

import getMetaTags from './../util/getMetaTags';

/*
  Full list of possible rest props:
  ---------------------------------
  locale
  canonicalUrl
  googleSiteVerification
  schema
  title
  fullTitle
  defaultTitle
  description
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
  links
 */

const mapDataToHelmetPropsWithStrategy = ({strategy, ...rest}) => {
  const propsToMap = rest;
  Object.keys(strategy).forEach(key => {
    Object.assign(propsToMap, {
      [key]: strategy[key](rest),
    });
  });

  const strategyMappedProps = {...propsToMap};
  const {links = [], locale, canonicalUrl, relNext, relPrev, schema, title} = strategyMappedProps;

  return {
    htmlAttributes: {
      lang: locale,
      itemscope: undefined,
      itemtype: `http://schema.org/${schema}`,
    },
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl,
      },
      {
        rel: 'prev',
        href: relPrev,
      },
      {
        rel: 'next',
        href: relNext,
      },
    ].concat(links),
    meta: getMetaTags(strategyMappedProps),
    title: title,
  };
};

export default strategy => props => <Helmet {...mapDataToHelmetPropsWithStrategy({strategy, ...props})} />;
