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
    })
      .populate({
        path: 'childBranch',
        populate: { path: 'childBranch', populate: { path: 'childBranch' } }
      })
      .populate('notes')
    res.send(branches)
  } catch (err) {
    throw err
  }
}

const CreateNote = async (req, res) => {
  console.log(req.body)
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
      note.parentBranch = branch
      await note.save()
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
      const result = await branch.save()
      res.send(result)
    }
  } catch (err) {
    throw err
  }
}

const CreateB2BConnection = async (req, res) => {
  const child_id = req.params.child_id
  try {
    const parentBranch = await Branch.findById(req.params.parent_id)
    if (!parentBranch.childBranch.includes(child_id)) {
      const childBranch = await Branch.findById(child_id)
      childBranch.parentBranch = parentBranch
      if (!childBranch.connected) {
        childBranch.connected = true
        await childBranch.save()
      } else {
        await childBranch.save()
        const oldBranch = await Branch.updateOne(
          { childBranch: child_id },
          { $pull: { childBranch: child_id } }
        )
      }
      parentBranch.childBranch.push(child_id)
      await parentBranch.save()
      res.send(parentBranch)
    }
  } catch (err) {
    throw err
  }
}

const UpdateBranch = async (req, res) => {
  const branch_id = req.params.branch_id
  try {
    const filter = { _id: branch_id }
    const update = req.body
    const result = await Branch.findOneAndUpdate(filter, update)
    res.send(result)
  } catch (err) {
    throw err
  }
}

const UpdateNote = async (req, res) => {
  const note_id = req.params.note_id
  try {
    const filter = { _id: note_id }
    const update = req.body
    const result = await Note.findOneAndUpdate(filter, update)
    res.send(result)
  } catch (err) {
    throw err
  }
}

const DeleteNote = async (req, res) => {
  const note_id = req.params.note_id
  try {
    await Branch.findOneAndUpdate(
      { notes: note_id },
      { $pull: { notes: note_id } }
    )
    const result = await Note.findOneAndDelete({ _id: note_id })
    res.send(result)
  } catch (err) {
    throw err
  }
}

const DeleteBranch = async (req, res) => {
  const branch_id = req.params.branch_id
  try {
    await Note.updateMany(
      { parentBranch: branch_id },
      { $set: { connected: false } }
    )
    const result = await Branch.findOneAndDelete({ _id: branch_id })
    res.send(result)
  } catch (err) {
    throw err
  }
}

const MoveBranchUp = async (req, res) => {
  try {
    const numToMove = parseInt(req.params.branch_num) - 1
    const childBranch = await Branch.findById(req.params.branch_id)
    const parentBranch = await Branch.findById(childBranch.parentBranch)
    const newPosition = parentBranch.childBranch[numToMove]
    parentBranch.childBranch[numToMove] =
      parentBranch.childBranch[numToMove - 1]
    parentBranch.childBranch[numToMove - 1] = newPosition
    const response = await parentBranch.save()
    res.send(response)
  } catch (err) {
    throw err
  }
}

const MoveBranchDown = async (req, res) => {
  try {
    const numToMove = parseInt(req.params.branch_num) - 1
    const childBranch = await Branch.findById(req.params.branch_id)
    const parentBranch = await Branch.findById(childBranch.parentBranch)
    const newPosition = parentBranch.childBranch[numToMove]
    parentBranch.childBranch[numToMove] =
      parentBranch.childBranch[numToMove + 1]
    parentBranch.childBranch[numToMove + 1] = newPosition
    const response = await parentBranch.save()
    res.send(response)
  } catch (err) {
    throw err
  }
}

module.exports = {
  GetNotes,
  CreateNote,
  GetBranches,
  CreateBranch,
  CreateNoteConnection,
  CreateB2BConnection,
  UpdateBranch,
  UpdateNote,
  DeleteNote,
  DeleteBranch,
  MoveBranchUp,
  MoveBranchDown
}
