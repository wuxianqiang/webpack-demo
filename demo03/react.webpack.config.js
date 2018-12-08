const path = require('path')

const DllPlugin = require('webpack/lib/DllPlugin')

module.exports = {
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js', // react.js, 当有用到react，react-dom 将在这个文件找
    library: '_dll_[name]' // var _dll_react = xxx
  },
  plugins: [
    new DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', '[name].manifest.json')
    })
  ]
}