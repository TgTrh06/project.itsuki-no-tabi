import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav>
        <h1>Itsuki no Tabi</h1>
        <div className="space-x-4">
            <p className="text-sm text-green-400">
              <Link to="/blogs" className="hover:text-pink-400">Blog</Link>
            </p>
            <p className="text-sm text-green-400">
              <Link to="*" className="hover:text-pink-400">Tour</Link>
            </p>
            <p className="text-sm text-green-400">
              <Link to="/login" className="hover:text-pink-400">Login</Link>
            </p>
        </div>
    </nav>
  )
}