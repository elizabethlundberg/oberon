import { useDraggable } from '@dnd-kit/core'
import { UpdateNote, DeleteNote } from '../services/NoteServices'
import { useState } from 'react'

const LeafNote = (props) => {
  const [editable, setEditable] = useState(false)
  const [editText, setEditText] = useState(props.body)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${props.id}`
  })
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  const handleEditClick = (e) => {
    setEditable(true)
  }
  const handleEditSubmit = (e) => {
    e.preventDefault()
    UpdateNote(props.id, editText)
  }

  const handleEditInput = (e) => {
    setEditText(e.target.value)
  }

  const handleDeleteClick = (e) => {
    DeleteNote(props.id)
  }

  const editForm = (
    <div className="border-4 border-black">
      <form onSubmit={handleEditSubmit}>
        <input type="text" value={editText} onChange={handleEditInput} />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  )
  const normalBody = (
    <div className="border-4 border-black">
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <p>{props.body}</p>
      </div>
      <div>
        <button onClick={handleEditClick}>EDIT</button>
        <button onClick={handleDeleteClick}>DELETE</button>
      </div>
    </div>
  )

  return editable ? editForm : normalBody
}

export default LeafNote
