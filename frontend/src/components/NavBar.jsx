import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const NavBar = ({user, setUser}) => {
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const delay = setTimeout(() => {
      navigate(busca.trim() ? `/?busca=${encodeURIComponent(busca)}` : '/');
    }, 500);
    return () => clearTimeout(delay);
  }, [busca, navigate, user]);

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
              <div>
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar notas..."
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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