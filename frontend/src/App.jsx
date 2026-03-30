import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import StudentsPage from './pages/StudentsPage'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="/" className="nav-brand">🎓 Student Manager</a>
        <ul className="nav-links">
          <li><NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink></li>
          <li><NavLink to="/students" className={({isActive}) => isActive ? 'active' : ''}>Students</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/students" element={<StudentsPage />} />
      </Routes>
      <footer className="footer">
        <p>Student Management System © 2026 — Built with React + Node.js + PostgreSQL</p>
      </footer>
    </BrowserRouter>
  )
}

export default App
