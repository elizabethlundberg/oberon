import { useDraggable } from '@dnd-kit/core'
import LeavesOnBranches from './LeavesOnBranches'
import { useEffect, useState } from 'react'
import DropBox from './DropBox'
import Branch from './Branch'
import {
  UpdateBranch,
  DeleteBranch,
  MoveBranchUp,
  MoveBranchDown
} from '../services/NoteServices'

const BranchNote = (props) => {
  const [childBranches, setChildBranches] = useState([])
  const [childNotes, setChildNotes] = useState([])
  const [editable, setEditable] = useState(false)
  const [editText, setEditText] = useState(props.body)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${props.id}`
  })
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px,0)` }
    : undefined

  useEffect(() => {
    if (props.childBranches.length) {
      let numberedBranches = props.childBranches
      let curNum = 1
      numberedBranches.forEach((branch) => {
        branch.number = curNum
        curNum++
      })
      setChildBranches(numberedBranches)
    }
    let noteArr = []
    if (props.childNotes.length) {
      props.childNotes.forEach((noteString) => {
        if (typeof noteString === 'string') {
          let noteToAdd = props.allNotes.find((allNote) => {
            return allNote._id === noteString
          })
          noteArr.push(noteToAdd)
        } else {
          noteArr.push(noteString)
        }
      })
      setChildNotes(noteArr)
    }
  }, [props])

  const nextLevel = parseInt(props.level) + 1

  const handleEditClick = (e) => {
    setEditable(true)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    UpdateBranch(props.id, editText)
  }

  const handleEditInput = (e) => {
    setEditText(e.target.value)
  }

  const handleDeleteClick = (e) => {
    DeleteBranch(props.id)
  }

  const editForm = (
    <form onSubmit={handleEditSubmit}>
      <input type="text" value={editText} onChange={handleEditInput} />
      <button type="submit">SUBMIT</button>
    </form>
  )

  const normalBody = (
    <div>
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <p>
          {props.number}. {props.body}
        </p>
      </div>
      <div>
        <button onClick={handleEditClick}>EDIT</button>
        <button onClick={handleDeleteClick}>DELETE</button>
      </div>
    </div>
  )

  const handleMoveUp = (e) => {
    MoveBranchUp(props.id, props.number)
  }

  const handleMoveDown = (e) => {
    MoveBranchDown(props.id, props.number)
  }

  const moveButtons = (
    <div>
      {props.number > 1 ? <button onClick={handleMoveUp}>▲</button> : ''}
      {props.number < props.parentLength ? (
        <button onClick={handleMoveDown}>▼</button>
      ) : (
        ''
      )}
    </div>
  )
  return (
    <div className={'border-4 border-black level-' + nextLevel}>
      {editable ? editForm : normalBody}
      {props.level > 1 ? moveButtons : ''}
      {props.level > 3 ? '' : <DropBox id={props.id} />}
      {childNotes.map((child) => (
        <LeavesOnBranches
          id={`note-${child._id}`}
          body={child.body}
          key={child._id}
        />
      ))}
      {childBranches.length
        ? childBranches.map((branch) => {
            return (
              <Branch
                number={branch.number}
                body={branch.body}
                childNotes={branch.notes}
                key={branch._id}
                id={`branch-${branch._id}`}
                level={nextLevel}
                childBranches={branch.childBranch}
                allBranches={props.allBranches}
                allNotes={props.allNotes}
                parentLength={childBranches.length}
              />
            )
          })
        : ''}
    </div>
  )
}

export default BranchNote
