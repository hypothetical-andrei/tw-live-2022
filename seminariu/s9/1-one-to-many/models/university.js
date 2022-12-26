const sequelize = require('../db')
const DataTypes = require('sequelize')

const University = sequelize.define('university', {
  universityName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 20]
    }
  }
})

module.exports = University
