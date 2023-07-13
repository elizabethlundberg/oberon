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
    if (!active.id || !over.id) {
      return
    } else if (active.id.startsWith('note') && over.id.startsWith('branch')) {
      const noteId = active.id.replace('note-', '')
      const branchId = over.id.replace('branch-', '')
      const res = await Client.post(
        `/tree/postnoteconnection/${noteId}/${branchId}`
      )
      return res
    } else if (active.id.startsWith('branch') && over.id.startsWith('branch')) {
      const parentBranch = over.id.replace('branch-', '')
      const childBranch = active.id.replace('branch-', '')
      const res = await Client.post(
        `/tree/postbranchtobranchconnection/${parentBranch}/${childBranch}`
      )
      return res
    }
  } catch (err) {
    throw err
  }
}

export const UpdateBranch = async (branch_id, data) => {
  try {
    const stripId = branch_id.replace('branch-', '')
    const res = await Client.put(`/tree/branchedit/${stripId}`, { body: data })
  } catch (err) {
    throw err
  }
}

export const UpdateNote = async (note_id, data) => {
  try {
    const stripId = note_id.replace('note-', '')
    const res = await Client.put(`/tree/noteedit/${stripId}`, { body: data })
  } catch (err) {
    throw err
  }
}

export const DeleteNote = async (note_id) => {
  try {
    const stripId = note_id.replace('note-', '')
    const res = await Client.delete(`/tree/notedelete/${stripId}`)
  } catch (err) {
    throw err
  }
}

export const MoveBranchUp = async (branch_id, branch_num) => {
  try {
    const stripId = branch_id.replace('branch-', '')
    const res = await Client.post(`/tree/branchmoveup/${stripId}/${branch_num}`)
  } catch (err) {
    throw err
  }
}

export const MoveBranchDown = async (branch_id, branch_num) => {
  try {
    const stripId = branch_id.replace('branch-', '')
    const res = await Client.post(
      `/tree/branchmovedown/${stripId}/${branch_num}`
    )
  } catch (err) {
    throw err
  }
}
