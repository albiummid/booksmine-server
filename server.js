const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.log(`ERROR:${err} `)
  console.log('Shutting down the server due to Uncaught Exceptions')
  process.exit(1)
})

// setting up config file
dotenv.config({ path: './config/config.env' })

// setting up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

// Connecting To DATABASE
connectDatabase()

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  )
})

// Handle unhandled promise rejections

process.on('unhandledRejection', (err) => {
  console.log(`ERROR:${err.message}`)
  console.log('Shutting down the server due to Unhandled Promise rejection')
  server.close(() => {
    process.exit(1)
  })
})
