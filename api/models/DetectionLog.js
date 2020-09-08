const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('detection_logs', new Schema({
  timestamp: { type: Date, default: Date.now },
  isUseMask: Boolean,
  isKeepDistance: Boolean,
  name: String
}))
