const express = require('express')
const books = require('./routes/bookRoutes')
const department = require('./routes/departmentRoutes')
const transaction = require('./routes/transactionRoutes')
const category = require('./routes/categoryRoutes')
const semester = require('./routes/semesterRoutes')
const favorite = require('./routes/favoriteRoutes')
const course = require('./routes/courseRoutes')
const order = require('./routes/orderRoutes')
const user = require('./routes/userRoutes')
const role = require('./routes/roleRoutes')

const errorMiddleware = require('./middlewares/error')
const cors = require('cors')

const app = express()
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://booksmine.vercel.app/')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  next()
}
// app.use(allowCrossDomain)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With,Content-Type,Accept,Authorization'
//   )
//   res.header(
//     'Access-Control-Allow-Methods',
//     'GET,PUT,PATCH,POST,DELETE,OPTIONS'
//   )
//   next()
// })
app.use(cors())
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   )
//   if (req.method == 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
//     return res.status(200).json({})
//   }

//   next()
// })

app.get('/', (req, res) => {
  res.send(
    `Hola ! You are on official Booksmine Node.js Server PORT-${process.env.PORT}. This server is  in ${process.env.NODE_ENV} mode !`
  )
})

// Use all routes

app.use('/api/v1/department', department)
app.use('/api/v1/transaction', transaction)
app.use('/api/v1/semester', semester)
app.use('/api/v1/category', category)
app.use('/api/v1/favorite', favorite)
app.use('/api/v1/course', course)
app.use('/api/v1/order', order)
app.use('/api/v1/book', books)
app.use('/api/v1/user', user)
app.use('/api/v1/role', role)

//MiddleWares to handleErorrs
app.use(errorMiddleware)

module.exports = app
