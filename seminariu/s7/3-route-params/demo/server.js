const express = require('express')

const app = express()

app.use(express.json())

app.locals.books = [{
	id: 1,
	title: 'a book',
	genre: 'sf',
	author: 'someone'
}, {
	id: 2,
	title: 'book',
	genre: 'fantasy',
	author: 'another'
}]

app.get('/books', (req, res) => {
	let results = app.locals.books
	if (req.query.genre) {
		results = app.locals.books.filter(e => e.genre.match(req.query.genre))
	}
	if (req.query.title) {
		results = results.filter(e => e.title.match(req.query.title))
	}
	if (req.query.author) {
		results = results.filter(e => e.author.match(req.query.author))
	}
	res.status(200).json(results)
})

app.post('/books', (req, res) => {
	try {
		if (typeof req.body.title !== 'string' || req.body.title.length < 3) {
			throw new Error('title is invalid')
		}
		app.locals.books.push(req.body)
		res.status(201).json({ message: 'created' })
	} catch (err) {
		console.warn(err)
		res.status(500).json({ message: 'some server error' })
	}
})

app.put('/books/:bid', (req, res) => {
	let id = parseInt(req.params.bid)
	const bookIndex = app.locals.books.findIndex(e => e.id === id)
	if (bookIndex !== -1) {
		app.locals.books[bookIndex].title = req.body.title
		app.locals.books[bookIndex].author = req.body.author
		app.locals.books[bookIndex].genre = req.body.genre
		res.status(200).json({ message: 'accepted' })
	} else {
		res.status(404).json({ message: 'not found' })
	}
})

app.listen(8080)