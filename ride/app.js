const express = require('express')
const app = express()
const rideRouter = require('./routes/ride.router')
const dotenv = require('dotenv')
dotenv.config()
const connect = require('./db/db')
connect()
const cookieparser = require('cookie-parser')
const rabbitMq = require('./service/rabbit')

rabbitMq.connect()

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(cookieparser())

app.use('/' , rideRouter)

module.exports = app