import express from 'express'

const app = express()

app.use(express.json())

app.locals.data = [{
  id: 1,
  content: 'some content'
}]

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' })
})

app.get('/items', (req, res) => {
  res.status(200).json(app.locals.content)
})

app.post('/items', (req, res) => {
  app.locals.push(req.body)
  res.status(201).json(req.body)
})

app.listen(8080)