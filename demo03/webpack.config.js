const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    // 当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们
    libraryTarget: 'var', // var=xxx
    // libraryTarget: 'commonjs', exports['zfpx']=xxx
    library: 'lib'
  }
}