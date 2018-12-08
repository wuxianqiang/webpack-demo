const path = require('path')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const HappyPack = require('happypack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    // 当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们
    // libraryTarget: 'var', // var=xxx
    // libraryTarget: 'commonjs', exports['zfpx']=xxx
    // libraryTarget: 'commonjs2', exports.exports = xxx
    // libraryTarget: 'window', window.lib = xxx
    // library: 'lib'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: { // id为babel的进程处理
          loader: 'happypack/loader?id=babel'
        },
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: { // id为css的进程处理
          loader: 'happypack/loader?id=css'
        },
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist/react.manifest.json')
    }),

    new HappyPack({
      id: 'babel',
      use: [{
        loader: 'babel-loader'
      }]
    }),

    new HappyPack({
      id: 'css',
      use: ['style-loader', 'css-loader']
    })
  ]
}