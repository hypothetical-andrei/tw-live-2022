const express = require('express')
const { sequelize, Sequelize } = require('./db')
const employeeRouter = require('./routers/employee-router')

const app = express()

app.use(express.json())

app.use('/employee-api', employeeRouter)

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error'})
})

app.listen(8080, async () => {
  try {
    await sequelize.authenticate()
    console.warn('Connected')
  } catch (error) {
    console.warn('Unable to connect to db')
    console.warn(error)
  }
})