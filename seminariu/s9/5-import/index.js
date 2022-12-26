// Express Initialisation
const express = require('express')
const application = express()
const port = process.env.PORT || 8080

// Sequelize Initialisation
const sequelize = require('./db')

// Import created models
const University = require('./models/university')
const Student = require('./models/student')
const Course = require('./models/course')

// Define entities relationship
University.hasMany(Student)
University.hasMany(Course)
Student.belongsToMany(Course, { through: 'enrollements' })
Course.belongsToMany(Student, { through: 'enrollements' })

// Express middleware
application.use(express.json())

/**
 * Create a special GET endpoint so that when it is called it will
 * sync our database with the models.
 */
application.put('/', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

/**
 * GET all the universities from the database.
 */
application.get('/universities', async (req, res, next) => {
  try {
    const universities = await University.findAll()
    if (universities.length > 0) {
      res.json(universities)
    } else {
      res.sendStatus(204)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * POST a new university to the database.
 */
application.post('/universities', async (req, res, next) => {
  try {
    const university = await University.create(req.body)
    res.status(201).location(university.id).send()
  } catch (err) {
    next(err)
  }
})

/**
 * GET a specific university's students.
 */
application.get('/universities/:universityId/students', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const students = await university.getStudents()
      if (students.length > 0) {
        res.json(students)
      } else {
        res.sendStatus(204)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * POST a new student into a university.
 */
application.post('/universities/:universityId/students', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const student = await Student.create(req.body)
      university.addStudent(student)
      await university.save()
      res.status(201).location(student.id).send()
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * GET a student by id from a university by id.
 */
application.get('/universities/:universityId/students/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const students = await university.getStudents({ id: req.params.studentId })
      const student = students.shift()
      if (student) {
        req.json(student)
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * PUT to update a student from a university.
 */
application.put('/universities/:universityId/students/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const students = await university.getStudents({ id: req.params.studentId })
      const student = students.shift()
      if (student) {
        await student.update(req.body)
        res.status(204)
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * DELETE a student from a university.
 */
application.delete('/universities/:universityId/students/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const students = await university.getStudents({ id: req.params.studentId })
      const student = students.shift()
      if (student) {
        await student.destroy()
        res.sendStatus(204)
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * GET the list of courses.
 */
application.get('/universities/:universityId/courses', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const courses = await university.getCourses()
      if (courses.length > 0) {
        res.json(courses)
      } else {
        res.sendStatus(204)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * GET a course by id.
 */
application.get('/university/:universityId/courses/:courseId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const courses = await university.getCourses({ id: req.params.courseId })
      const course = courses.shift()
      if (course) {
        res.json(course)
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * POST a new course.
 */
application.post('/universities/:universityId/courses', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const course = await Course.create(req.body)
      university.addCourse(course)
      await university.save()
      res.status(201).location(course.id).send()
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * PUT to update a course.
 */
application.put('/universities/:universityId/courses/:courseId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const courses = await university.getCourses({ id: req.params.courseId })
      const course = courses.shift()
      if (course) {
        await course.update(req.body)
        res.sendStatus(204)
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * DELETE a course.
 */
application.delete('/universities/:universityId/courses/:courseId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const courses = await university.getCourses({ id: req.params.courseId })
      const course = courses.shift()
      if (course) {
        await course.destroy()
        res.sendStatus(204)
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * GET student enrollements to courses.
 */
application.get('/universities/:universityId/students/:studentId/enrollements', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const students = await university.getStudents({ id: req.params.studentId })
      const student = students.shift()
      if (student) {
        const courses = await student.getCourses({ attributes: ['id'] })
        if (courses.length > 0) {
          res.json(courses)
        } else {
          res.sendStatus(204)
        }
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * POST to enroll a student to a course.
 */
application.post('/universities/:universityId/students/:studentId/enrollements/:courseId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const students = await university.getStudents({ id: req.params.studentId })
      const student = students.shift()
      const courses = await university.getCourses({ id: req.params.courseId })
      const course = courses.shift()
      if (student && course) {
        student.addCourse(course)
        student.save()
        res.sendStatus(204)
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * DELETE student enrollement to a course.
 */
application.delete('/universities/:universityId/students/:studentId/enrollements/:courseId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const students = await university.getStudents({ id: req.params.studentId })
      const student = students.shift()
      const courses = await university.getCourses({ id: req.params.courseId })
      const course = courses.shift()
      if (student && course) {
        student.removeFromCourse(course)
        student.save()
        res.sendStatus(204)
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * GET the list of enrolled students to a course.
 */
application.get('/universities/:universityId/courses/:courseId/enrollements', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const courses = await university.getCourses({ id: req.params.courseId })
      const course = courses.shift()
      if (course) {
        const students = await course.getStudents({ attributes: ['id'] })
        if (students.length > 0) {
          res.json(students)
        } else {
          res.sendStatus(204)
        }
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * POST to enroll a student to a course.
 */
application.post('/universities/:universityId/courses/:courseId/enrollements/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const courses = await university.getCourses({ id: req.params.courseId })
      const course = courses.shift()
      const students = await university.getStudents({ id: req.params.studentId })
      const student = students.shift()
      if (course && student) {
        course.addStudent(student)
        course.save()
        res.sendStatus(204)
      } else {
        res.sendStatus(400)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * DELETE student enrollement to a course.
 */
application.delete('/universities/:universityId/courses/:courseId/enrollements/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId)
    if (university) {
      const courses = await university.getCourses({ id: req.params.courseId })
      const course = courses.shift()
      const students = await university.getStudents({ id: req.params.studentId })
      const student = students.shift()
      if (student && course) {
        course.removeStudent(student)
        course.save()
        res.sendStatus(204)
      } else {
        res.sendStatus(404)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// Create a middleware to handle 500 status errs.
application.use((err, req, res, next) => {
  console.err(`[ERROR]: ${err}`)
  res.status(500).json(err)
})

// Kickstart the Express aplication
application.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}.`)
})
