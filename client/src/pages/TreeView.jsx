import { useEffect, useState } from 'react'
import { GetNotes } from '../services/NoteServices'
import { useNavigate } from 'react-router-dom'
import { PostNote } from '../services/NoteServices'

const TreeView = ({ user }) => {
  let navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [formValue, setFormValue] = useState({ body: '' })

  useEffect(() => {
    const handleNotes = async () => {
      const data = await GetNotes()
      setNotes(data)
    }
    handleNotes()
  }, [])

  const handleChange = (e) => {
    setFormValue({ body: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await PostNote({
      body: formValue.body,
      user: user.id
    })
    setFormValue({
      body: ''
    })
  }

  const addNoteForm = (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formValue.body}
          onChange={handleChange}
          required
        />
        <button type="submit">+</button>
      </form>
    </div>
  )

  return user && notes.length ? addNoteForm : addNoteForm
}

export default TreeView
