var path = require('path');
var webpack = require('webpack');
var minimize = process.argv.indexOf('--minimize') !== -1;
var plugins = [];

if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      minimize: true
    }));
}

module.exports = {
  context: __dirname,
  entry: './app/frontend/app.es6',

  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'application.js',
    publicPath: '/assets',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    modulesDirectories: [ 'node_modules'],
  },

  plugins: plugins,

  module: {
    preLoaders: [
        { test: [/\.es6$/, /\.jsx$/], exclude: /node_modules/, loader: 'eslint' }
    ],
    loaders: [
      {
        test: [/\.es6$/, /\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  }
};
