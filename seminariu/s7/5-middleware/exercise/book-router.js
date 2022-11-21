const express = require('express')
const { checkIds } = require('./middleware')

const router = express.Router()

router.get('/books', (req, res) => {
	let results = res.app.locals.books
	if (req.query.genre) {
		results = res.app.locals.books.filter(e => e.genre.match(req.query.genre))
	}
	if (req.query.title) {
		results = results.filter(e => e.title.match(req.query.title))
	}
	if (req.query.author) {
		results = results.filter(e => e.author.match(req.query.author))
	}
	res.status(200).json(results)
})

router.post('/books', (req, res) => {
	try {
		if (typeof req.body.title !== 'string' || req.body.title.length < 3) {
			throw new Error('title is invalid')
		}
		res.app.locals.books.push(req.body)
		res.status(201).json({ message: 'created' })
	} catch (err) {
		console.warn(err)
		res.status(500).json({ message: 'some server error' })
	}
})

router.put('/books/:bid', checkIds, (req, res) => {
	let id = parseInt(req.params.bid)
	const bookIndex = res.app.locals.books.findIndex(e => e.id === id)
	if (bookIndex !== -1) {
		res.app.locals.books[bookIndex].title = req.body.title
		res.app.locals.books[bookIndex].author = req.body.author
		res.app.locals.books[bookIndex].genre = req.body.genre
		res.status(200).json({ message: 'accepted' })
	} else {
		res.status(404).json({ message: 'not found' })
	}
})

module.exports = router