import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Event from './pages/Event'
import Navbar from './Components/NavBar'
import Profile from './pages/Profile'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/event/:id" element={<Event/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App