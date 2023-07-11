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
      {props.children
        ? props.children.map((child) => {
            const childNote = props.notes.find((note) => note._id === child)
            return <div key={childNote._id}>{childNote.body}</div>
          })
        : ''}
    </div>
  )
}

export default BranchNote
