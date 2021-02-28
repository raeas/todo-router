require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./middleware/error-handler')
const appRouter = require('./todo/todo-router')
// const TodoService = require('./todo/todo-service') // moved to todo-router
// const xss = require('xss') // moved to todo-router
// const jsonParser = express.json() // moved to todo-router
const path = require('path')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption, {
  skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())

app.use(appRouter)

app.use(express.static('public'))

app.use(errorHandler)

module.exports = app