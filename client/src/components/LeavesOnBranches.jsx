import { useDraggable } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { UpdateNote, DeleteNote } from '../services/NoteServices'

const LeavesOnBranches = (props) => {
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
    setEditable(false)
  }

  const handleEditInput = (e) => {
    setEditText(e.target.value)
  }
  const handleDeleteClick = (e) => {
    DeleteNote(props.id)
    setTimeout(() => {
      location.reload()
    }, 300)
  }

  const editForm = (
    <div className="border-4 border-black bg-emerald-300">
      <form onSubmit={handleEditSubmit}>
        <input
          className="border-2 border-black bg-emerald-200"
          type="text"
          value={editText}
          onChange={handleEditInput}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  )
  const normalBody = (
    <div className="border-2 border-black bg-emerald-300">
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <p>{editText}</p>
      </div>
      <div>
        <button onClick={handleEditClick}>EDIT</button>
        <button onClick={handleDeleteClick}>DELETE</button>
      </div>
    </div>
  )
  return editable ? editForm : normalBody
}

export default LeavesOnBranches
