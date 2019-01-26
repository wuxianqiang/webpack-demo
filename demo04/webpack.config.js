const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 缓存分离公共模块
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          minSize: 1
        },
        // 抽离jQuery的
        vendor: {
          name: 'vendor',
          priority: 1,
          test: /node_modules/,
          chunks: 'initial',
          minChunks: 2,
          minSize: 1
        }
      }
    }
  },
  entry: {
    home: './src/Home.js', // a.js b.js
    login: './src/Login.js' // a.js b.js
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
            // plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/\.\/locale\//, /moment/),
    new HtmlWebpackPlugin({
      filename: 'home.html',
      template: './public/index.html',
      chunks: ['home', 'vendor', 'common']
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './public/index.html',
      chunks: ['login', 'vendor', 'common']
    })
  ],
  devServer: {
    contentBase: './dist'
  }
}
