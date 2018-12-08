const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝静态文件的，如assets 拷贝到dist 中
const CleanWebpackPlugin = require('clean-webpack-plugin')
const mock = require('./mock')

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
    host: 'localhost',
    proxy: {
      // http://localhost:3000/api/user
      '/api': 'http://localhost:3000' // 请求/api 开头的将代理

      // http://localhost:3000/user
      // 重写请求路径
      // 'api': {
      //   target: 'http://localhost:3000',
      //   pathRewrite: {
      //     '^api': ''
      //   }
      // }
      
    },
    before (app) {
      // webpack-dev-server 内部用的也是express
      mock(app)
      // app.get('/api/user', (req, res) => {
      //   res.send([{
      //     id: 1,
      //     name: 'hello world'
      //   }])
      // })
    }
  },
  // 在开发模式才有，报错可以定位到源代码的位置
  devtool: 'source-map', // 在单独文件中生成，可以映射到列
  // devtool: 'cheap-module-source-map', // 在单独文件中生成，不可以映射到列
  // devtool: 'eval-source-map', // 在同个文件中生成，可以映射到列
  // devtool: 'cheap-module-eval-source-map', // 在同个文件中生成，可以映射到列
  externals: {
    jquery: 'jQuery' // 外部提供，不需要打包，比如说已经引入cdn,key是模块名，值就是真正运行的时候从window的哪个属性上取值
  },
  // webpack-dev-server 已经做好了文件自动编译
  // watch: true,
  // watchOptions: {
  //   exclude: /node_modules/,
  //   poll: 1000,
  //   aggregateTimeout: 500
  // },
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
    }),
    new webpack.BannerPlugin('wuxianqiang'), // 文件顶部的注释文字
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets'), // 从这个文件
        to: path.resolve(__dirname, 'dist/assets') // 拷贝到这个文件下
      }
    ]),
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]) // 打包前删除文件
  ]
}
