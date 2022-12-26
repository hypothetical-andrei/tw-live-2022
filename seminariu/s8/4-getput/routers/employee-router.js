const express = require('express')
const Employee = require('../models/employee')

const router = express.Router()

router.get('/employees', async (req, res, next) => {
  try {
    const employees = await Employee.findAll()
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

router.delete('/employees/:eid', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.eid)
    if (employee) {
      await employee.destroy()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})


module.exports = router