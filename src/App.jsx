import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Singup from './Components/Singup'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
function App() {


  return (
  <Router>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/singup" element={<Singup />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
  </Router>
      
  )
}

export default App
