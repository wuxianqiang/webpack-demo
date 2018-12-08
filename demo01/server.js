const Koa = require('koa')
const app = new Koa()
// const webpack = require('webpack')
// 将webpack集成到这个服务上，而不是webpack自带的服务webpack-dev-server
// const webpackDevMiddleare = require('webpack-dev-middleware')

// const webpackConfig = require('./webpack.config.js')
// const compiler = webpack(webpackConfig)
// app.use(webpackDevMiddleare(compiler))

app.use(async (ctx) => {
  ctx.body = '<h1>helow world</h1>'
})

app.listen(3000, () => {
  console.log('server port in 3000')
})