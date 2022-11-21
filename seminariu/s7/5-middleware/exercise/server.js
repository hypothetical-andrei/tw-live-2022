const express = require('express')
const bookRouter = require('./book-router')

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

app.use('/book-api', bookRouter)

app.listen(8080)