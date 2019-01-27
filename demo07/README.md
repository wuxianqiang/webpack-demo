1. expose-loader 暴露全局变量
```js
// 首先入口文件需要引入$，之后才会暴露到所以模块
// 在rules增加下面代码
{
  test: require.resolve('jquery'),
  loader: "expose-loader?$"
}
// 或者在入口文件增加下面代码
require("expose-loader?$!jquery");
```
