const express = require('express')
const cors = require('cors')

const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storea: 'sample.db'
})

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING
  },
  fullName: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.ENUM,
    values: ['regular-user', 'power-user']
  }
})

const app = express()
app.use(cors())
app.use(express.json())

app.get('/sync', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    const sampleData = [{
      username: 'first-user',
      fullName: 'john doe',
      type: 'regular-user'
    }, {
      username: 'second-user',
      fullName: 'jane doe',
      type: 'regular-user'
    }, {
      username: 'third-user',
      fullName: 'alice doe',
      type: 'power-user'
    }]
    for (const item of sampleData) {
      const user = new User(item)
      await user.save()
    }
    res.status(201).json({ message: 'sample db created' })
  } catch (err) {
    next(err)
  }
})

app.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

app.post('/users', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error' })
})

app.listen(8080)
