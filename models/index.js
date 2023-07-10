const mongoose = require('mongoose')
const userSchema = require('./User')
const noteSchema = require('./Note')

const User = mongoose.model('User', userSchema)
const Note = mongoose.model('Note', noteSchema)

module.exports = {
  User,
  Note
}
