const path = require('path')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')

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
        use: {
          loader: 'babel-loader'
        },
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist/react.manifest.json')
    })
  ]
}