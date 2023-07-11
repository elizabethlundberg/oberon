import Client from './api'

export const GetNotes = async () => {
  try {
    const res = await Client.get('/tree/notes')
    return res.data
  } catch (err) {
    throw err
  }
}

export const GetBranches = async () => {
  try {
    const res = await Client.get('/tree/branches')
    return res.data
  } catch (err) {
    throw err
  }
}

export const CreateNote = async (data) => {
  try {
    const res = await Client.post('/tree/postnote', data)
    return res
  } catch (err) {
    throw err
  }
}

export const CreateBranch = async (data) => {
  try {
    const res = await Client.post('/tree/postbranch', data)
    return res
  } catch (err) {
    throw err
  }
}

export const CreateConnection = async (active, over) => {
  try {
    if (active.id.startsWith('note') && over.id.startsWith('branch')) {
      const noteId = active.id.replace('note-', '')
      const branchId = over.id.replace('branch-', '')
      const res = await Client.post(
        `/tree/postnoteconnection/${noteId}/${branchId}`
      )
      return res
    }
  } catch (err) {
    throw err
  }
}
