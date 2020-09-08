const server = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const compression = require('compression')
const io = require('socket.io')

const mongoose = require('mongoose')
const DetectionLog = require('./models/DetectionLog')

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/gemastik13')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  console.log('Connection Succeeded')
})

// Create express instance
const app = express()
server.Server(app)
io(server)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  req.io = io
  next()
})

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(compression())

// Require Controller
const UserController = require('./controllers/UserController')
const DetectionLogController = require('./controllers/DetectionLogController')

app.use(UserController)
app.use(DetectionLogController)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
