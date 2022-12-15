require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.DATABASE_URI)
const db = mongoose.connection

// Connection Listeners
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to CourierTnM DATABASE'))

app.use(express.json())

const apis = require('./routes/api')
app.use('/api', apis)

app.listen('4545', () => console.log('Server started at port 4545'))
