import React from 'react'

export const Navbar = () => {
  return (
    <nav>
        <h1>Itsuki no Tabi</h1>
        <div className="space-x-4">
            <a href="#" className="hover:text-blue-500">Blog</a>
            <a href="#" className="hover:text-blue-500">Tour</a>
            <a href="#" className="hover:text-blue-500">Login</a>
        </div>
    </nav>
  )
}
