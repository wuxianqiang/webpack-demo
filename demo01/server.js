const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  ctx.body = '<h1>helow world</h1>'
})

app.listen(3000, () => {
  console.log('server port in 3000')
})