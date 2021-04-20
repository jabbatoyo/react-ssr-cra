export const defaultUrl = () => `${process.env.REACT_APP_HOST_DOMAIN}`;
export const getCanonical = pathname =>
  defaultUrl() + pathname.replace(/\/$/g, "");
