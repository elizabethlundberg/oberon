import { useDraggable } from '@dnd-kit/core'
import LeavesOnBranches from './LeavesOnBranches'
import { useEffect, useState } from 'react'
import DropBox from './DropBox'

const BranchNote = (props) => {
  const [children, setChildren] = useState([])
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${props.id}`
  })
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px,0)` }
    : undefined
  useEffect(() => {
    setChildren(props.children)
  })

  return (
    <div className="border-4 border-black">
      <p ref={setNodeRef} style={style} {...listeners} {...attributes}>
        DRAG
      </p>
      <p>{props.body}</p>
      {children.map((child) => {
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
