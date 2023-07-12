import { useDraggable } from '@dnd-kit/core'
import LeavesOnBranches from './LeavesOnBranches'
import { useEffect, useState } from 'react'
import DropBox from './DropBox'
import Branch from './Branch'

const BranchNote = (props) => {
  const [childBranches, setChildBranches] = useState([])
  const [childNotes, setChildNotes] = useState([])
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${props.id}`
  })
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px,0)` }
    : undefined
  useEffect(() => {
    setChildBranches(props.childBranches)
    let childNotesArr = []
    if (props.childNotes.length) {
      props.childNotes.forEach((noteString) => {
        if (typeof noteString === 'string') {
          const noteToAdd = props.allNotes.find((allNote) => {
            return allNote._id === noteString
          })
          childNotesArr.push(noteToAdd)
          setChildNotes(childNotesArr)
        } else {
          setChildNotes(props.childNotes)
        }
      })
    }
  }, [])
  const nextLevel = parseInt(props.level) + 1

  return (
    <div className={'border-4 border-black level-' + nextLevel}>
      <p ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {props.body}
      </p>
      {childBranches.length
        ? childBranches.map((branch) => {
            return (
              <Branch
                body={branch.body}
                childNotes={branch.notes}
                key={branch._id}
                id={`branch-${branch._id}`}
                level={nextLevel}
                childBranches={branch.childBranch}
                allBranches={props.allBranches}
                allNotes={props.allNotes}
              />
            )
          })
        : ''}
      {childNotes.map((child) => {
        return (
          <LeavesOnBranches
            id={`note-${child._id}`}
            body={child.body}
            key={child._id}
          />
        )
      })}
      <DropBox id={props.id} />
    </div>
  )
}

export default BranchNote
