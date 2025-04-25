const express = require('express')
const app = express()
const userRouter = require('./routes/user.routes')
const dotenv = require('dotenv')
dotenv.config()

const cookieParser = require('cookie-parser')

const connect = require('./db/db')
connect()


app.use(express.json())
app.use(express.urlencoded({ extended :true}))
app.use(cookieParser())

app.use('/' , userRouter)

module.exports = app