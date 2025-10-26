import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import BlogPage from './pages/Blog/BlogPage'
import BlogDetailPage from './pages/Blog/BlogDetailPage'

function App() {
  return (
	<div>
		<Navbar />
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/blogs" element={<BlogPage />} />
			<Route path="/blogs/:id" element={<BlogDetailPage />} />
		</Routes>
  	</div>
  )
}

export default App
