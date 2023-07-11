const mongoose = require('mongoose')
const userSchema = require('./User')
const noteSchema = require('./Note')
const branchSchema = require('./Branch')

const User = mongoose.model('User', userSchema)
const Note = mongoose.model('Note', noteSchema)
const Branch = mongoose.model('Branch', branchSchema)

module.exports = {
  User,
  Note,
  Branch
}
