const express = require('express')
const app = express()
const rideRouter = require('./routes/ride.router')
const dotenv = require('dotenv')
dotenv.config()
const connect = require('./db/db')
connect()
const cookieparser = require('cookie-parser')


app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(cookieparser())

app.use('/' , rideRouter)

module.exports = app