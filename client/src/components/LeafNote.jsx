import { useDraggable } from '@dnd-kit/core'

const LeafNote = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${props.id}`
  })
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined
  const Element = props.element || 'div'
  return (
    <Element
      className="border-4 border-black"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <p>{props.body}</p>
    </Element>
  )
}

export default LeafNote
