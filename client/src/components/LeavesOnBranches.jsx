import { useDraggable } from '@dnd-kit/core'
import { useEffect } from 'react'

const LeavesOnBranches = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${props.id}`
  })
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined
  return (
    <div
      className="border-3 border-black"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <p>{props.body}</p>
    </div>
  )
}

export default LeavesOnBranches
