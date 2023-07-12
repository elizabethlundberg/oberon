import { useDroppable } from '@dnd-kit/core'

const DropBox = (props) => {
  const { isOver, setNodeRef } = useDroppable({ id: props.id })
  const style = { color: isOver ? 'green' : undefined }
  return (
    <div ref={setNodeRef} style={style}>
      BOX
    </div>
  )
}

export default DropBox
