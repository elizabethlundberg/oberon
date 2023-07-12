import { useEffect, useState } from 'react'
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
import { DndContext } from '@dnd-kit/core'
import Trunk from '../components/Trunk'

const TreeView = ({ user }) => {
  let navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [noteFormValue, setNoteFormValue] = useState({ body: '' })
  const [branchFormValue, setBranchFormValue] = useState({ body: '' })
  const [branches, setBranches] = useState([])

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
    console.log(e)
    CreateConnection(active, over)
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
      setBranches(data)
    }
    getNotes()
    getBranches()
    console.log(branches)
  }, [])

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
        <Fill>
          {user && branches.length ? (
            <div>
              {addBranchForm}
              <div>
                {branches.map((branch) => (
                  <BranchNote
                    body={branch.body}
                    children={branch.notes}
                    key={branch._id}
                    id={`branch-${branch._id}`}
                    notes={notes}
                  />
                ))}
              </div>
            </div>
          ) : (
            addBranchForm
          )}
        </Fill>
        <Left size="300px" scrollable={true}>
          <Trunk />
        </Left>
      </div>
    </DndContext>
  )
}

export default TreeView
