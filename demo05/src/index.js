import $ from 'jquery'

// $已经通过CDN注册了，externals指定了$变量不会被打包，所以上面的代码没有任何作用

console.log(window.$ === $)
