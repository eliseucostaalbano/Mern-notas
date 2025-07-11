import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({user}) => {
  return (
    <nav className='bg-gray-900 p-4 text-white shadow-lg'>
        <div className='container mx-auto flex items-center justify-between'>
            <Link to="/">App Notas</Link>
            {user && (
              <>
              <div>{user.nome}</div>
              <button>Logout</button>
              </>
            )}
             </div>
    </nav>
  )
}

export default NavBar