1. webpack.ProvidePlugin 暴露全局变量
```js
new webpack.ProvidePlugin({
  '$': 'jquery' // 每个模块都有$，但是window上没有$
})
```
> 所有模块都不用引入jQuery了
