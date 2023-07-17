import { useDroppable } from '@dnd-kit/core'

const DropBox = (props) => {
  const { isOver, setNodeRef } = useDroppable({ id: props.id })
  const style = { color: isOver ? 'green' : undefined }
  return (
    <div
      className="bg-cyan-200 border-2 border-slate-400 z-0"
      ref={setNodeRef}
      style={style}
    >
      <h3 className="text-slate-400 text-center">DROP HERE</h3>
    </div>
  )
}

export default DropBox
