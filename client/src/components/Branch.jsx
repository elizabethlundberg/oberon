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
    setChildNotes(props.childNotes)
    setChildBranches(props.childBranches)
    console.log(childBranches)
  })
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
