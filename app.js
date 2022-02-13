const express = require('express')
const books = require('./routes/book')
const department = require('./routes/department')
const semester = require('./routes/semester')
const course = require('./routes/course')
const order = require('./routes/order')
const cors = require('cors')
const allowCrossDomain = require('./utils/cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Home Page of BOOKIMINE server

app.get('/', (req, res) => {
  res.send(
    `Hola ! You are on official Booksmine Node.js Server PORT-${process.env.PORT} in ${process.env.NODE_ENV} !`
  )
})

// Use all routes
app.use('/api/v1/book', books)
app.use('/api/v1/department', department)
app.use('/api/v1/semester', semester)
app.use('/api/v1/course', course)
app.use('/api/v1/order', order)

module.exports = app
