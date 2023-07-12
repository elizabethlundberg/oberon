const { Note, Branch } = require('../models')

const GetNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: res.locals.payload.id
    })
    res.send(notes)
  } catch (err) {
    throw err
  }
}

const GetBranches = async (req, res) => {
  try {
    const branches = await Branch.find({
      user: res.locals.payload.id
    }).populate('notes')
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
  const note_id = req.params.note_id
  try {
    const branch = await Branch.findById(req.params.branch_id)
    if (!branch.notes.includes(note_id)) {
      const note = await Note.findById(note_id)
      if (!note.connected) {
        note.connected = true
        note.save()
      } else {
        const oldBranch = await Branch.updateOne(
          { notes: note_id },
          { $pull: { notes: note_id } }
        )
      }
      branch.notes.push(note_id)
      const result = branch.save()
      res.send(result)
    }
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
