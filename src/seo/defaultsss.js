export default intl => ({
  schema: "WebPage",
  defaultTitle: "Grocasa",
  title: intl.formatMessage({ id: "site.title" }),
  fullTitle: intl.formatMessage({ id: "site.title" }),
  description: intl.formatMessage({ id: "site.meta_description" })
});
