import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AuthRoutes from './routes/AuthRoutes'
import InterestsListPage from './pages/interest/InterestsListPage'
import PlanningPage from './pages/PlanningPage'
import UserProfile from './pages/user/UserProfile'
import AdminRoutes from './routes/AdminRoutes'
import DestinationRoutes from './routes/DestinationRoutes'
import ArticleRoutes from './routes/ArticleRoutes'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
	return (
		<div className="min-h-screen bg-appbg mt-10">
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />

				<Route path="/destinations/*" element={<DestinationRoutes />} />
				<Route path="/articles/*" element={<ArticleRoutes />} />

				<Route path="/auth/*" element={<AuthRoutes />} />

				<Route path="/user/profile" element={<UserProfile />} />

				<Route path="/admin/*" element={
					<ProtectedRoute>
						<AdminRoutes />
					</ProtectedRoute>}
				/>

				<Route path="/planning" element={
					<ProtectedRoute>
						<PlanningPage />
					</ProtectedRoute>
				} />

				<Route path="/interests/:slug" element={<InterestsListPage />} />
			</Routes>
		</div>
	)
}

export default App
