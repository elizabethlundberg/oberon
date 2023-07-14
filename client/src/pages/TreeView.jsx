import { useEffect, useState } from 'react'
import {
  GetNotes,
  GetBranches,
  GetProject,
  UpdateProject
} from '../services/NoteServices'
import { useNavigate } from 'react-router-dom'
import {
  CreateNote,
  CreateBranch,
  CreateConnection
} from '../services/NoteServices'
import LeafNote from '../components/LeafNote'
import { Right, Fill, Top } from 'react-spaces'
import BranchNote from '../components/Branch'
import { DndContext, DragOverlay } from '@dnd-kit/core'

const TreeView = ({ user }) => {
  let navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [noteFormValue, setNoteFormValue] = useState({ body: '' })
  const [branchFormValue, setBranchFormValue] = useState({ body: '' })
  const [branches, setBranches] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [editable, setEditable] = useState(false)
  const [editText, setEditText] = useState('')

  const handleNoteChange = (e) => {
    setNoteFormValue({ body: e.target.value })
  }

  const handleBranchChange = (e) => {
    setBranchFormValue({ body: e.target.value })
  }

  const handleBranchSubmit = async (e) => {
    e.preventDefault()
    let newBranch = await CreateBranch({
      body: branchFormValue.body,
      user: user.id
    })
    const topLevelBranches = branches.filter((branch) => {
      return !branch.parentBranch
    })
    newBranch.data.number = topLevelBranches.length + 1
    setBranches([...branches, newBranch.data])
    setBranchFormValue({
      body: ''
    })
  }

  const handleNoteSubmit = async (e) => {
    e.preventDefault()

    const newNote = await CreateNote({
      body: noteFormValue.body,
      user: user.id
    })
    setNotes([...notes, newNote.data])
    setNoteFormValue({
      body: ''
    })
  }

  const handleDragEnd = (e) => {
    const { active, over } = e
    if (over) {
      CreateConnection(active, over)
      const parentSearchId = over.id.replace('branch-', '')
      let parentBranch = branches.find((branch) => {
        return branch._id === parentSearchId
      })
      const parentBranchIdx = branches.findIndex((branch) => {
        return branch === parentBranch
      })
      if (active.id.startsWith('note-')) {
        const noteSearchId = active.id.replace('note-', '')
        let childNote = notes.find((note) => {
          return note._id === noteSearchId
        })
        childNote.parentBranch = parentBranch._id
        childNote.connected = true
        let newArr = branches
        newArr[parentBranchIdx].notes.push(childNote)
        setBranches([...newArr])
      } else if (active.id.startsWith('branch-')) {
        const branchSearchId = active.id.replace('branch-', '')
        let childBranch = branches.find((branch) => {
          return branch._id === branchSearchId
        })
        childBranch.parentBranch = parentBranch._id
        childBranch.connected = true
        let newArr = branches
        newArr[parentBranchIdx].childBranch.push(childBranch)
        setBranches([...newArr])
      }
    }
    setActiveId(null)
  }

  const addNoteForm = (
    <div>
      <form onSubmit={handleNoteSubmit}>
        <input
          type="text"
          value={noteFormValue.body}
          onChange={handleNoteChange}
          required
        />
        <button type="submit">+</button>
      </form>
    </div>
  )

  const addBranchForm = (
    <div>
      <form onSubmit={handleBranchSubmit}>
        <input
          type="text"
          value={branchFormValue.body}
          onChange={handleBranchChange}
          required
        />
        <button type="submit">+</button>
      </form>
    </div>
  )

  const handleEditClick = () => {
    setEditable(true)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    UpdateProject(user, editText)
    setEditable(false)
  }

  const handleEditInput = (e) => {
    setEditText(e.target.value)
    console.log(editText)
  }

  const normalBody = (
    <div>
      <p>{editText}</p>
      <button onClick={handleEditClick}>EDIT</button>
    </div>
  )

  const editForm = (
    <form onSubmit={handleEditSubmit}>
      <input type="text" value={editText} onChange={handleEditInput} />
      <button type="submit">SUBMIT</button>
    </form>
  )

  useEffect(() => {
    const getNotes = async () => {
      const data = await GetNotes()
      setNotes(data)
    }
    const getBranches = async () => {
      let data = await GetBranches()
      let curNum = 1
      await data.forEach((datum) => {
        if (!datum.connected) {
          datum.number = curNum
          curNum += 1
        }
      })
      setBranches(data)
    }
    const getProject = async () => {
      const data = await GetProject()
      setEditText(data.researchQuestion)
      console.log(editText)
    }
    getProject()
    if (!notes.length) {
      getNotes()
    }
    if (!branches.length) {
      getBranches()
    }
  }, [])

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div id="tree-view">
        <Top size={50}>{editable ? editForm : normalBody}</Top>
        <Right size="300px" scrollable={true}>
          {user && notes.length ? (
            <div>
              {addNoteForm}
              <div>
                {notes.map((note) =>
                  note.connected ? (
                    ''
                  ) : (
                    <LeafNote
                      id={`note-${note._id}`}
                      body={note.body}
                      key={note._id}
                    />
                  )
                )}
              </div>
            </div>
          ) : (
            addNoteForm
          )}
        </Right>
        <Fill scrollable={true}>
          {user && branches.length ? (
            <div>
              {addBranchForm}
              <div>
                {branches.map((branch) =>
                  branch.connected ? (
                    ''
                  ) : (
                    <BranchNote
                      number={branch.number}
                      body={branch.body}
                      childNotes={branch.notes}
                      key={branch._id}
                      id={`branch-${branch._id}`}
                      notes={notes}
                      level="1"
                      childBranches={branch.childBranch}
                      allNotes={notes}
                      parentLength={branches.length}
                      allBranches={branches}
                    />
                  )
                )}
              </div>
            </div>
          ) : (
            addBranchForm
          )}
        </Fill>
      </div>
    </DndContext>
  )
}

export default TreeView
