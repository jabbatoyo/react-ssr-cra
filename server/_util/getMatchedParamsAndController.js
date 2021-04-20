import PathMatch from 'path-match';

const getParamsMatcherByPath = new PathMatch();

const getMatchedPath = (paths, reqPath) =>
  typeof paths === 'string'
    ? getParamsMatcherByPath(paths)(reqPath)
      ? paths
      : undefined
    : Object.values(paths).find(path => getParamsMatcherByPath(path)(reqPath));

export default (reqPath, config) => {
  const routeConfig = config.find(aConfig => getMatchedPath(aConfig.paths, reqPath));

  if (!routeConfig) {
    return {};
  }

  let matchedParams = getParamsMatcherByPath(getMatchedPath(routeConfig.paths, reqPath))(reqPath);
  if (matchedParams[0]) {
    matchedParams = {slug: matchedParams[0]};
  }

  return {
    controller: routeConfig.controller,
    matchedParams: matchedParams,
  };
};
