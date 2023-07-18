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
          className="border-2 border-black bg-emerald-200 ml-2 mt-2"
          type="text"
          value={editText}
          onChange={handleEditInput}
        />
        <br />
        <button
          className="bg-emerald-500 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded m-2"
          type="submit"
        >
          SUBMIT
        </button>
      </form>
    </div>
  )
  const normalBody = (
    <div className="border-2 border-black bg-emerald-300">
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="pl-2 pt-2"
      >
        <p>{editText}</p>
      </div>
      <div>
        <button
          className="bg-emerald-500 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded m-2"
          onClick={handleEditClick}
        >
          EDIT
        </button>
        <button
          className="bg-emerald-500 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded m-2"
          onClick={handleDeleteClick}
        >
          DELETE
        </button>
      </div>
    </div>
  )
  return editable ? editForm : normalBody
}

export default LeavesOnBranches
