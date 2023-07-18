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
    const stripId = props.id.replace('branch-', '')
    let numberedBranches = props.childBranches
    props.allBranches.forEach((branch) => {
      const includesBranch = (branchArrEl) => {
        return branchArrEl._id === branch._id
      }
      if (
        branch.parentBranch === stripId &&
        !numberedBranches.some(includesBranch) &&
        branch.connected
      ) {
        numberedBranches.push(branch)
      }
    })
    let curNum = 1
    numberedBranches.forEach((branch) => {
      branch.number = curNum
      curNum++
    })
    setChildBranches(numberedBranches)
    let noteArr = []
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
    props.allNotes.forEach((note) => {
      const includesNote = (noteArrEl) => {
        return noteArrEl._id === note._id
      }
      if (
        note.parentBranch === stripId &&
        !noteArr.some(includesNote) &&
        note.connected
      ) {
        noteArr.push(note)
      }
    })
    setChildNotes(noteArr)
  }, [props])

  const nextLevel = parseInt(props.level) + 1

  const handleEditClick = (e) => {
    setEditable(true)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    UpdateBranch(props.id, editText)
    setEditable(false)
  }

  const handleEditInput = (e) => {
    setEditText(e.target.value)
  }

  const handleDeleteClick = (e) => {
    e.preventDefault()
    DeleteBranch(props.id)
    setTimeout(() => {
      location.reload()
    }, 200)
  }

  const editForm = (
    <form onSubmit={handleEditSubmit}>
      <input
        type="text"
        value={editText}
        onChange={handleEditInput}
        className="border-black border-2 ml-2 mt-2"
      />
      <br />
      <button
        className="bg-cyan-500 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded m-2"
        type="submit"
      >
        SUBMIT
      </button>
    </form>
  )

  const getLevelText = () => {
    if (props.level === 2) {
      return 'Sub-section'
    } else if (props.level === 3) {
      return 'Sub-sub-section'
    } else if (props.level === 4) {
      return 'Sub-sub-sub-section'
    } else {
      return 'Section'
    }
  }
  const levelText = getLevelText()

  const normalBody = (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="pl-2 pt-2"
      >
        <p>
          <b>
            {levelText} {props.number}
          </b>{' '}
          {editText}
        </p>
      </div>
      <div>
        <button
          className="bg-cyan-500 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded m-2"
          onClick={handleEditClick}
        >
          EDIT
        </button>
        <button
          className="bg-cyan-500 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded m-2"
          onClick={handleDeleteClick}
        >
          DELETE
        </button>
      </div>
    </div>
  )

  const handleMoveUp = (e) => {
    MoveBranchUp(props.id, props.number)
    setTimeout(() => {
      location.reload()
    }, 200)
  }

  const handleMoveDown = (e) => {
    MoveBranchDown(props.id, props.number)
    setTimeout(() => {
      location.reload()
    }, 200)
  }

  const moveButtons = (
    <div>
      {props.number > 1 ? (
        <button className="ml-2" onClick={handleMoveUp}>
          ▲
        </button>
      ) : (
        ''
      )}
      {props.number < props.parentLength ? (
        <button className="ml-2" onClick={handleMoveDown}>
          ▼
        </button>
      ) : (
        ''
      )}
    </div>
  )

  return (
    <div className={'bg-cyan-400 border-4 border-black level-' + nextLevel}>
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
