import { useDraggable, useDroppable } from '@dnd-kit/core'

const BranchNote = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id
  })
  const style = {
    color: isOver ? 'green' : undefined
  }
  return (
    <div ref={setNodeRef} style={style} className="border-4 border-black">
      <p>{props.body}</p>
    </div>
  )
}

export default BranchNote
