const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model(
  'users',
  new Schema({
    firstName: String,
    lastName: String
  })
)
