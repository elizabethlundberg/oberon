import { useEffect, useState, useReducer } from 'react'
import { GetNotes, GetBranches } from '../services/NoteServices'
import { useNavigate } from 'react-router-dom'
import {
  CreateNote,
  CreateBranch,
  CreateConnection
} from '../services/NoteServices'
import LeafNote from '../components/LeafNote'
import { Right, Fill, Left } from 'react-spaces'
import BranchNote from '../components/Branch'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import Trunk from '../components/Trunk'

const TreeView = ({ user }) => {
  let navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [noteFormValue, setNoteFormValue] = useState({ body: '' })
  const [branchFormValue, setBranchFormValue] = useState({ body: '' })
  const [branches, setBranches] = useState([])
  const [activeId, setActiveId] = useState(null)

  const handleNoteChange = (e) => {
    setNoteFormValue({ body: e.target.value })
  }

  const handleBranchChange = (e) => {
    setBranchFormValue({ body: e.target.value })
  }

  const handleBranchSubmit = async (e) => {
    e.preventDefault()
    const newBranch = await CreateBranch({
      body: branchFormValue.body,
      user: user.id
    })
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
      if (active.id.startsWith('note-')) {
        const noteSearchId = active.id.replace('note-', '')
        let childNote = notes.find((note) => {
          return note._id === noteSearchId
        })
        let newArr = branches
        newArr[parentBranch.number - 1].notes.push(childNote)
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

  useEffect(() => {
    const getNotes = async () => {
      const data = await GetNotes()
      setNotes(data)
    }
    const getBranches = async () => {
      const data = await GetBranches()
      let curNum = 1
      await data.forEach((datum) => {
        if (!datum.connected) {
          datum.number = curNum
          curNum += 1
        }
      })
      setBranches(data)
    }
    if (!notes.length) {
      getNotes()
    }
    if (!branches.length) {
      getBranches()
    }
    console.log(branches)
  }, [branches])

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div id="tree-view">
        {user && notes.length ? (
          <Right size="300px" scrollable={true}>
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
          </Right>
        ) : (
          addNoteForm
        )}
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
