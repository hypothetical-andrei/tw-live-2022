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

module.exports = router