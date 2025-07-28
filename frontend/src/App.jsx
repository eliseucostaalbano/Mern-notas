import { Navigate, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import Registro from "./components/Registro"
import Home from "./components/Home"
import { useState , useEffect } from "react"
import axios from "axios"

function App() {
  const [user, setUser] = useState(null)
 useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const { data } = await axios.get('/api/user/eu', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setUser(data)
        } catch (error) {
          console.error("Erro ao buscar usuário:", error)
          localStorage.removeItem('token')
        } 
      }
    }
    fetchUser()
  }, [])
  return (
    <div className="min-h-screen bg-gray-500">
      <NavBar user={user} setUser={setUser} />
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
