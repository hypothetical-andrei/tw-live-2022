const express = require('express')
const { sequelize, Sequelize } = require('../db')
const Op = Sequelize.Op 
const Employee = require('../models/employee')

const router = express.Router()

router.get('/employees', async (req, res, next) => {
  try {
    const query = {}
    if (Object.keys(req.query).length !== 0) {
      const { minSalary, name } = req.query
      query.where = {}
      if (minSalary) {
        query.where.salary = {
          [Op.gt]: req.query.minSalary
        }
      }
      if (name) {
        query.where.firstName  = {
          [Op.like]: `%${req.query.name}%`
        }
      }
    }
    const employees = await Employee.findAll(query)
    res.status(200).json(employees)
  } catch (err) {
    next(err)
  }
})

router.post('/employees', async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body)
    res.status(201).json(employee)
  } catch (err) {
    next(err)
  }
})

router.get('/employees/:eid', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.eid)
    if (employee) {
      res.status(200).json(employee)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

router.put('/employees/:eid', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.eid)
    if (employee) {
      await employee.update(req.body, { fields: [ 'firstName', 'lastName', 'email', 'birthYear' ] })
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})


module.exports = router