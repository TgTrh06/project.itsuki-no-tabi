import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import AuthRoutes from './routes/AuthRoutes'
import BlogRoutes from './routes/BlogRoutes'

function App() {
  return (
	<div>
		<Navbar />
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/profile" element={<ProfilePage />} />
			<Route path="/auth/*" element={<AuthRoutes />} />
			<Route path="/blogs/*" element={<BlogRoutes />} />
		</Routes>
  	</div>
  )
}

export default App
