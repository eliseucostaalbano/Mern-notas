
import { Link, useNavigate } from 'react-router-dom'

const NavBar = ({user, setUser}) => {
  const navigate = useNavigate();

   const lidarLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  return (
    <nav className='bg-gray-900 p-4 text-white shadow-lg'>
        <div className='container mx-auto flex items-center justify-between'>
            <Link to="/">App Notas</Link>
            {user && (
              <>
              <div className='flex items-center space-x-4'>
               <span className="text-gray-300 font-medium">{user.nome}</span>
               <button  onClick={lidarLogout} className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-black">Logout</button> 
              </div>
              </>
            )}
             </div>
    </nav>
  )
}

export default NavBar