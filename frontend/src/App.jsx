import { Route,Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Event from './pages/Event'
import Navbar from './Components/Navbar'
import Profile from './pages/Profile'
import Passwordchange from './pages/Passwordchange'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './Components/AdminDashboard'
import VoterDashboard from './Components/VoterDashboard'
import EventHistory from './pages/EventHistory'
const App = () => {
  return (
    <div>
      <AuthProvider>  
      <Navbar/>
      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/event/:id" element={<Event/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/change-password/:id" element={<Passwordchange/>}/>
        <Route path="/dashboard/:id" element={<Dashboard/>}/>
        <Route path="/dashboard/AdminDashboard/:id" element={<AdminDashboard/>} />
        <Route path="/dashboard/VoterDashboard/:id" element={<VoterDashboard/>} />
        <Route path="/eventHistory/:id" element={<EventHistory/>} />
      </Routes>
      </AuthProvider>
    </div>
  )
}

export default App