require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

mongoose.connect(process.env.DATABASE_URI)
const db = mongoose.connection

// Connection Listeners
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to CourierTnM DATABASE'))

app.use(cors())
app.options('*', cors())
app.use(express.json())

/*
app.get('*', function (req, res, next) {
  console.log('Request was made to: ' + req.originalUrl)
  return next()
})
app.post('*', function (req, res, next) {
  console.log('Request was made to: ' + req.originalUrl)
  return next()
})
app.put('*', function (req, res, next) {
  console.log('Request was made to: ' + req.originalUrl)
  return next()
})
app.patch('*', function (req, res, next) {
  console.log('Request was made to: ' + req.originalUrl)
  return next()
})
*/

const apis = require('./routes/api')
app.use('/api', apis)

const port = process.env.PORT || '4545'

app.listen(port, () => console.log('Server started at port 4545'))
