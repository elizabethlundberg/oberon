import Home from './pages/Home'
import './App.css'
import Nav from './components/Nav'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Register from './pages/Register'
import { CheckSession } from './services/Auth'

const App = () => {
  return (
    <div className="App">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
