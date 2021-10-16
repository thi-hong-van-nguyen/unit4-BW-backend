const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const userRouter = require('./users/users-router')
const classRouter = require('./classes/classes-router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/users', userRouter)
server.use('/api/classes', classRouter)

server.get('/', (req, res) => {
  res.json({
    message: 'welcome to fitness'
  })
})

server.get('*', (req, res, next) => {
  next({
    status: 400,
    message: `this ${req.originalUrl} endpoint is not built yet!!`
  })
})

server.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    stack: err.stack,
    message: err.message
  })
})

module.exports = server
