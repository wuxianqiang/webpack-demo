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
    contentBase: './dist',
    port: 8080,
    host: 'localhost'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // css-loader 处理CSS引入路径
        // style-loader 把CSS转换为JS代码，在执行的时候注入一个style标签
        // 可以用use也可以用loader
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}
