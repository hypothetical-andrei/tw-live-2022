const express = require('express')
const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sample.db',
  define: {
  	timestamps: false
  }
})

const Book = sequelize.define('book', {
  title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [3, 10]
		}
	},
  content: Sequelize.TEXT
})

const app = express()

app.use((req, res, next) => {
	console.log(`${req.method} -> ${req.url}`)
	next()
})

app.use(express.json())

app.get('/sync', async (req, res, next) => {
	try {
		await sequelize.sync({ force: true })
		res.status(201).json({ message: 'tables created' })
	} catch (err) {
		next(err)
	}
})

app.get('/books', async (req, res, next) => {
	try {
		const books = await Book.findAll()
		res.status(200).json(books)
	} catch (err) {
		next(err)
	}
})

app.post('/books', async (req, res, next) => {
	try {
		const book = req.body
		const createdBook = await Book.create(book)
		res.status(201).json(createdBook)
	} catch (err) {
		next(err)
	}
})

app.get('/books/:bid', async (req, res, next) => {
	try {
		const book = await Book.findByPk(req.params.bid)
		if (book) {
			res.status(200).json(book)
		} else {
			res.status(404).json({ message: 'not found'})
		}
	} catch (err) {
		next(err)
	}
})

app.put('/books/:bid', async (req, res, next) => {
	try {
		const book = await Book.findByPk(req.params.bid)
		if (book) {
			await book.update(req.body, {
				fields: ['title', 'content']
			})
			res.status(202).json({ message: 'accepted' })
		} else {
			res.status(404).json({ message: 'not found'})
		}
	} catch (err) {
		next(err)
	}
})

app.delete('/books/:bid', async (req, res, next) => {
	try {
		const book = await Book.findByPk(req.params.bid)
		if (book) {
			await book.destroy()
			res.status(202).json({ message: 'accepted' })
		} else {
			res.status(404).json({ message: 'not found'})
		}
	} catch (err) {
		next(err)
	}
})

app.use((err, req, res, next) => {
	console.warn(err)
	res.status(500).json({ message: 'some error occured' })
})

app.listen(8080)