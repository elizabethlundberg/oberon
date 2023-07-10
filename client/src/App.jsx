import Home from './pages/Home'
import './App.css'
import Nav from './components/Nav'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Register from './pages/Register'
import { CheckSession } from './services/Auth'
import SignIn from './pages/SignIn'
import TreeView from './pages/TreeView'

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
    <div className="App">
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/tree" element={<TreeView user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
