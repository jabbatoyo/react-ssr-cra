const {override, addBundleVisualizer} = require('customize-cra');
const rewirePostCss = require('react-app-rewire-postcss');
const rewireBabelLoader = require('react-app-rewire-babel-loader');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const addNodeLibraries = config =>
  rewireBabelLoader.include(config, resolveApp('node_modules/@foes/react-i18n-routing'));

const addPostCss = config =>
  rewirePostCss(config, {
    plugins: () => [require('postcss-preset-env')()],
  });

const addBundleAnalyze = addBundleVisualizer(
  {
    analyzerMode: 'static',
    reportFilename: 'report.html',
  },
  true,
);

module.exports = override(addNodeLibraries, addPostCss, addBundleAnalyze);
