/* eslint-disable import/order */

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const compression = require('compression')
const Pusher = require('pusher')

// Create express instance
const app = express()

// Connect MongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gemastik13')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  // console.log('Connection Succeeded')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  req.pusher = new Pusher({
    appId: '815593',
    key: '8d921907fc15f3017c77',
    secret: '77f4dd94b30008381977',
    cluster: 'ap1'
  })

  next()
})

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(compression())

// Require Controller
const UserController = require('./controllers/UserController')
const DetectionLogController = require('./controllers/DetectionLogController')
const TrafficController = require('./controllers/TrafficController')

app.use(UserController)
app.use(DetectionLogController)
app.use(TrafficController)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
