const { Note } = require('../models')

const GetNotes = async (req, res) => {
  try {
    console.log('here')
    const notes = await Note.find({})
    res.send(notes)
    console.log('here2')
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

module.exports = {
  GetNotes,
  CreateNote
}
