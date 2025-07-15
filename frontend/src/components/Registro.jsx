import{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Registro = ({ setUser }) => {
  const [usernome, setUsernome] = useState("");
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const navegar =  useNavigate()
  const LidarSubmmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/user/registro', { usernome, email, senha })
      localStorage.setItem('token', data.token)
      setUser(data)
      navegar('/')
    } catch (error) {
      setError(error.response?.data?.message || "erro no servidor");
    }
  }
  return (
    <div className="bg-white container mx-auto max-w-md mt-10 p-6 rounded-lg shadow-md">
      <h2 className='text-2xl font-semibold mb-6 text-center'>Registrar</h2>
       {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
       <form onSubmit={LidarSubmmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={usernome}
              onChange={(e) => setUsernome(e.target.value)}
              placeholder="Nome de usuário"
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
             placeholder="Email"
             className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
             required
           />
         </div>
         <div>
           <input
             type="password"
             value={senha}
             onChange={(e) => setSenha(e.target.value)}
             placeholder="Senha"
             className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
             required
           />
         </div>
         <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700">
            Registrar
         </button>
       </form>
        <p className="mt-4 text-center">
          já tem uma conta?{' '}
          <Link to="/login" className="text-blue-500 cursor-pointer hover:underline">
            Faça login
          </Link>
        </p>
      </div>
  )
}

export default Registro