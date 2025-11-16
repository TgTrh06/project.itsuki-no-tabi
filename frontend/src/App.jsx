import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AuthRoutes from './routes/AuthRoutes'
import DestinationPage from './pages/destination/DestinationPage'
import DestinationDetailPage from './pages/destination/DestinationDetailPage'
import InterestsListPage from './pages/interest/InterestsListPage'
import BookingPage from './pages/BookingPage'
import UserProfile from './pages/user/UserProfile'
import AdminRoutes from './routes/AdminRoutes'
import DestinationRoutes from './routes/DestinationRoutes'
import ArticleRoutes from './routes/ArticleRoutes'

function App() {
	return (
		<div className="min-h-screen bg-appbg mt-10">
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />

				<Route path="/auth/*" element={<AuthRoutes />} />
				<Route path="/user/profile" element={<UserProfile />} />
				<Route path="/admin/*" element={<AdminRoutes />} />

				<Route path="/destinations/*" element={<DestinationRoutes />} />
				<Route path="/articles/*" element={<ArticleRoutes />} />
				<Route path="/booking" element={<BookingPage />} />
				
				<Route path="/interests/:slug" element={<InterestsListPage />} />
			</Routes>
		</div>
	)
}

export default App
