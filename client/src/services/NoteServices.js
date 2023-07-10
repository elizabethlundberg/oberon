import Client from './api'

export const GetNotes = async () => {
  try {
    const res = await Client.get('/tree')
    console.log(res)
    return res.data
  } catch (err) {
    throw err
  }
}

export const PostNote = async (data) => {
  try {
    const res = await Client.post('/', data)
    return res
  } catch (err) {
    throw err
  }
}
