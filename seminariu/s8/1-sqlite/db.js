const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'simple.db'
})

module.exports = {
  Sequelize, sequelize
}