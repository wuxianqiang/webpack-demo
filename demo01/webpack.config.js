const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    // 静态文件根目录
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8080,
    host: 'localhost'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'bundle.html'
    })
  ]
}
