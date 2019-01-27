// 专门打包react和react-dom的
// 动态链接库配置文件

const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    react: ['react', 'react-dom'],
  },
  output: {
    filename: '[name]_dll.js',
    library: 'vendor', // 模块名称
    // libraryTarget: 'commonjs', // 导出模块
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.DllPlugin({
      // name 和 library 名字一样
      name: 'vendor',
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
}
