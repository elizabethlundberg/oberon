const { Note, Branch } = require('../models')

const GetNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: res.locals.payload.id })
    res.send(notes)
  } catch (err) {
    throw err
  }
}

const GetBranches = async (req, res) => {
  try {
    const branches = await Branch.find({ user: res.locals.payload.id })
    res.send(branches)
  } catch (err) {
    throw err
  }
}

const CreateNote = async (req, res) => {
  try {
    const note = await Note.create({ ...req.body })
    res.send(note)
  } catch (err) {
    throw err
  }
}

const CreateBranch = async (req, res) => {
  try {
    const branch = await Branch.create({ ...req.body })
    res.send(branch)
  } catch (err) {
    throw err
  }
}

const CreateNoteConnection = async (req, res) => {
  try {
    const updateNote = {
      $set: {
        branch: req.params.branch_id
      }
    }
    const newNote = await Note.findByIdAndUpdate(req.params.note_id, updateNote)
    res.send(newNote)
  } catch (err) {
    throw err
  }
}

module.exports = {
  GetNotes,
  CreateNote,
  GetBranches,
  CreateBranch,
  CreateNoteConnection
}
