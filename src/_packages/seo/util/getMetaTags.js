export default props => {
  const {
    title,
    defaultTitle,
    description,
    keywords,
    image,
    twitterUser,
    contentType,
    canonicalUrl,
    noCrawl,
    googleSiteVerification,
    published,
    updated,
    category,
    tags,
    opengraph,
    twitter
  } = props;

  const getOpengraphPropertyContent = (prop, defaultPropValue) =>
    opengraph && opengraph[prop] ? opengraph[prop] : defaultPropValue;

  const getTwitterPropertyContent = (prop, defaultPropValue) =>
    twitter && twitter[prop] ? twitter[prop] : defaultPropValue;

  const metaTags = [];

  if (twitterUser) {
    metaTags.push(
      { name: "twitter:site", content: twitterUser },
      { name: "twitter:creator", content: twitterUser }
    );
  }

  if (title) {
    metaTags.push(
      { itemprop: "name", content: title },
      {
        name: "twitter:title",
        content: getTwitterPropertyContent("title", title)
      },
      {
        property: "og:title",
        content: getOpengraphPropertyContent("title", title)
      }
    );
  }

  if (keywords) {
    metaTags.push({ property: "keywords", content: keywords });
  }

  if (description) {
    metaTags.push(
      { itemprop: "description", content: description },
      { name: "description", content: description },
      {
        name: "twitter:description",
        content: getTwitterPropertyContent("description", description)
      },
      {
        property: "og:description",
        content: getOpengraphPropertyContent("description", description)
      }
    );
  }

  if (image) {
    metaTags.push(
      { itemprop: "image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: getTwitterPropertyContent("image", image)
      },
      {
        property: "og:image",
        content: getOpengraphPropertyContent("image", image)
      }
    );
  }

  if (googleSiteVerification) {
    metaTags.push({
      property: "google-site-verification",
      content: googleSiteVerification
    });
  }

  if (contentType) {
    metaTags.push({ property: "og:type", content: contentType || "website" });
  }

  if (canonicalUrl) {
    metaTags.push({ property: "og:url", content: canonicalUrl });
  }

  if (noCrawl) {
    metaTags.push({ name: "robots", content: "noindex, nofollow" });
  }

  if (published) {
    metaTags.push({ name: "article:published_time", content: published });
  }

  if (updated) {
    metaTags.push({ name: "article:modified_time", content: updated });
  }

  if (category) {
    metaTags.push({ name: "article:section", content: category });
  }

  if (tags) {
    metaTags.push({ name: "article:tag", content: tags });
  }

  return metaTags;
};
