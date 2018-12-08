module.exports = function (app) {
  app.get('/api/user', (req, res) => {
    res.send([{
      id: 1,
      name: 'hello world'
    }])
  })

  app.get('/api/admin', (req, res) => {
    res.send([{
      id: 1,
      name: 'hello world'
    }])
  })
}