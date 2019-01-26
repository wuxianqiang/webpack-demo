1. 抽离公共模块
```js
// 多页打包的时候都引入了相同的文件a.js,b.js
entry: {
  home: './src/Home.js', // a.js b.js
  login: './src/Login.js' // a.js b.js
}

optimization: {
  splitChunks: {
    cacheGroups: {
      common: {
        chunks: 'initial', // 从入口开始处理
        minChunks: 2, // 至少使用2次
        minSize: 1 // 有一个字节公用了就抽离
      }
    }
  }
}
```
2. 如果引入了相同模块的同时又引入了第三方模块，可以先抽离第三方模块，再抽相同模块
```js
entry: {
  home: './src/Home.js', // a.js b.js jquery.js
  login: './src/Login.js' // a.js b.js jquery.js
}

optimization: {
  splitChunks: {
    cacheGroups: {
      common: {
        chunks: 'initial',
        minChunks: 2,
        minSize: 1
      },
      vendor: {
        priority: 1,
        test: /node_modules/,
        chunks: 'initial',
        minChunks: 2,
        minSize: 1
      }
    }
  }
}
```
