const express = require('express')

const { sequelize, Sequelize } = require('./db')

const app = express()

app.listen(8080, async () => {
  try {
    await sequelize.authenticate()
    console.warn('Connected')
  } catch (error) {
    console.warn('Unable to connect to db')
    console.warn(error)
  }
})