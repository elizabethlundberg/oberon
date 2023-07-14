const mongoose = require('mongoose')
const userSchema = require('./User')
const noteSchema = require('./Note')
const branchSchema = require('./Branch')
const projectSchema = require('./Project')

const User = mongoose.model('User', userSchema)
const Note = mongoose.model('Note', noteSchema)
const Branch = mongoose.model('Branch', branchSchema)
const Project = mongoose.model('Project', projectSchema)

module.exports = {
  User,
  Note,
  Branch,
  Project
}
