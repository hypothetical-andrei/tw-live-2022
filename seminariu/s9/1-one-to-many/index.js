// Express Initialisation
const express = require('express')
const app = express()
const PORT = 8080

// Sequelize Initialisation
const sequelize = require('./db')

// Import created models
const University = require('./models/university')
const Student = require('./models/student')

app.use(express.json())

// Define the model relationship.
University.hasMany(Student)

/**
 * Create a special GET endpoint so that when it is called it will
 * sync our database with the models.
 */
app.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'Database created with the models.' })
  } catch (err) {
    next(err)
  }
})

/**
 * GET all the universities from the database.
 */
app.get('/universities', async (req, res, next) => {
  try {
    const universities = await University.findAll()
    res.status(200).json(universities)
  } catch (err) {
    next(err)
  }
})

/**
 * POST a new university to the database.
 */
app.post('/universities', async (req, res, next) => {
  try {
    await University.create(req.body)
    res.status(201).json({ message: 'University Created!' })
  } catch (err) {
    next(err)
  }
})

/**
 * GET all students.
 */
app.get('/students', async (req, res, next) => {
  try {
    const students = await Student.findAll()
    res.status(200).json(students)
  } catch (err) {
    next(err)
  }
})

/**
 * POST a new student into a university.
 */
app.post('/universities/:universityId/students', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const student = new Student(req.body)
      student.universityId = university.id
      await student.save()
      res.status(201).json({ message: 'Student crated!' })
    } else {
      res.status(404).json({ message: '404 - University Not Found' })
    }
  } catch (error) {
    next(error)
  }
})

/**
 * GET all the students from a university using include.
 */
app.get('/universities/:universityId/students', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId, {
      include: [Student]
    })
    if (university) {
      res.status(200).json(university.students)
    } else {
      res.status(404).json({ message: '404 - University Not Found!' })
    }
  } catch (error) {
    next(error)
  }
})

/**
 * GET all the students from a university using include.
 */
 app.get('/universities/:universityId/students/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId, {
      include: [{
        model: Student,
        where: {
          id: req.params.studentId
        }
      }]
    })
    const students = university.students
    const student = students.shift()
    // const university = await University.findByPk(req.params.universityId)
    // if (university) {
    //   const students = await university.getStudents({
    //     where: {
    //       id: req.params.studentId
    //     }
    //   })
    //   const student = students.shift()
    // const student = await Student.findByPk(req.params.studentId, {
    //   where: {
    //     universityId: req.params.universityId
    //   }
    // })
    if (student){
      res.status(200).json(student)
    } else {
      res.status(404).json({ message: '404 - University Not Found!' })
    }
  } catch (error) {
    next(error)
  }
})

// Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
  console.error('[ERROR]:' + err)
  res.status(500).json({ message: '500 - Server Error' })
})

// Kickstart the Express aplication
app.listen(PORT, () => {
  console.log('The server is running on http://localhost:' + PORT)
})
