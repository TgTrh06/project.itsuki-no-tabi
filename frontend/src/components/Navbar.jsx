import { Link, useNavigate } from "react-router-dom"
import { User, LogOut } from "lucide-react"
import { useState } from "react"
import useAuthStore from "../store/authStore"

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      setIsDropdownOpen(false)
      navigate("/")
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-4 py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">        
          <Link to="/" className="hover:text-purple-400">Itsuki no Tabi</Link>
        </h1>

        <div className="flex items-center space-x-6">
          <div className="space-x-4">
            <Link to="/blogs" className="text-sm text-green-400 hover:text-pink-400">Blog</Link>
            <Link to="/tours" className="text-sm text-green-400 hover:text-pink-400">Tour</Link>
          </div>

          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-green-600 hover:text-purple-400"
              >
                <User className="w-6 h-6" />
                <span className="text-sm">{user?.username}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/auth/login" className="text-sm text-green-400 hover:text-pink-400">Login</Link>
              <Link to="/auth/signup" className="text-sm text-green-400 hover:text-pink-400">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}