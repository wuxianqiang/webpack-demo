const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    // 静态文件根目录
    contentBase: './dist',
    port: 8080,
    host: 'localhost'
  },
  // 在开发模式才有，报错可以定位到源代码的位置
  devtool: 'source-map', // 在单独文件中生成，可以映射到列
  // devtool: 'cheap-module-source-map', // 在单独文件中生成，不可以映射到列
  // devtool: 'eval-source-map', // 在同个文件中生成，可以映射到列
  // devtool: 'cheap-module-eval-source-map', // 在同个文件中生成，可以映射到列
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
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        // css-loader 处理CSS引入路径
        // style-loader 把CSS转换为JS代码，在执行的时候注入一个style标签
        // 可以用use也可以用loader
        use: [{ // 收集所有的CSS文件
            loader: MiniCssExtractPlugin.loader, // css分离
            options: {
              insertAt: 'top' // style 标签默认插入到尾部，配置参数来插入到头部
            }
          },
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpej|png|bmp|eot|woff|woff2|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              outputPath: 'images', // 输出路径
              publicPath: '/images' // 访问路径
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      //压缩css资源的
      new OptimizeCSSAssetsPlugin()
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
      filename: 'css/[name].css'
    }),
    // 全局引入，无须每个文件注册， 在所有的模块都相当与import _ from lodash
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ]
}
