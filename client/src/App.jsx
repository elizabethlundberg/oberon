import Home from './pages/Home'
import './App.css'
import Nav from './components/Nav'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Register from './pages/Register'
import { CheckSession } from './services/Auth'
import SignIn from './pages/SignIn'
import TreeView from './pages/TreeView'
import { ViewPort, Top, CenterType, Fill } from 'react-spaces'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <ViewPort>
      <div className="App">
        <Top
          size={170}
          centerContent={CenterType.Vertical}
          className="bg-emerald-500"
        >
          <Nav user={user} handleLogOut={handleLogOut} />
        </Top>
        <main>
          <Fill className="bg-gradient-to-t from-emerald-700 to-emerald-500">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signin" element={<SignIn setUser={setUser} />} />
              <Route path="/tree" element={<TreeView user={user} />} />
            </Routes>
          </Fill>
        </main>
      </div>
    </ViewPort>
  )
}

export default App
