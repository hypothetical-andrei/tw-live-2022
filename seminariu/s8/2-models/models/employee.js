const { Sequelize, sequelize } = require('../db')

const Employee = sequelize.define('employee', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 10]
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  birthYear: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1900
    }
  }, 
  salary: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1000
    }
  }
})

module.exports = Employee
