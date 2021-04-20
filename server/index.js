require('dotenv').config({path: `${__dirname}/../.env`});

require('isomorphic-fetch');

require('ignore-styles');

require('@babel/polyfill');

require('@babel/register')({
  ignore: [/\/(build|node_modules)\//],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['syntax-dynamic-import', 'dynamic-import-node', 'react-loadable/babel'],
});

require('./server');
