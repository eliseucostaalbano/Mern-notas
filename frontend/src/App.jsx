import { Navigate, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import Registro from "./components/Registro"
import Home from "./components/Home"
import { useState } from "react"

function App() {
  const [user, setUser] = useState(null)
  return (
    <div className="min-h-screen bg-gray-500">
      <NavBar user={user} />
      <Routes>
          <Route
          path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/registro" element={user ? <Navigate to="/" /> : <Registro setUser={setUser} />}
        />
        <Route
          path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  )
}

export default App
