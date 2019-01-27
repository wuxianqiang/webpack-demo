1. 通过CDN暴露全局变量
```js
// 首先通过html文件引入CDN链接地址
// webpack配置中增加
externals: {
  'jquery': '$'
}
```
