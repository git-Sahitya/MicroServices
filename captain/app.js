const express = require('express')
const app = express()
const captainRouter = require('./routes/captain.routes')
const dotenv = require('dotenv')
dotenv.config()

const cookieParser = require('cookie-parser')
const rabbitMq = require('./service/rabbit')
rabbitMq.connect()

const connect = require('./db/db')
connect()


app.use(express.json())
app.use(express.urlencoded({ extended :true}))
app.use(cookieParser())

app.use('/' , captainRouter)

module.exports = app