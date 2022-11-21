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

app.listen(8080)