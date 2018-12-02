const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
        use: [
          { // 收集所有的CSS文件
            loader: MiniCssExtractPlugin.loader, // css分离
            options: {
              insertAt: 'top' // style 标签默认插入到尾部，配置参数来插入到头部
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpej|png|bmp|eot|woff|woff2|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true // 去除双引号
      },
      hash: true // 防止缓存的
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}
