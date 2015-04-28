var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './app/main.js']
  },
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: __dirname + '/node_modules',
        loader: 'jsxhint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: __dirname + '/node_modules',
        loaders: ['react-hot','babel']
      },
      {
        test:/\.less/,
        exclude: __dirname + '/node_modules',
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test:/\.css$/,
        exclude:__dirname + 'node_modules',
        loader: 'style-loader!css-loader'
      }
    ]
  },

  jshint: {
    globalstrict: true,
    esnext:true,
    browser: true,
    devel: true
  },

  devServer: {
    proxy: {
      '/golftotaal': 'http://localhost:3100'
    }
  }
};