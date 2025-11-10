import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { formatDate } from "../utils/date";

export default function ProfilePage() {
	const { user, isAuthenticated, checkAuth } = useAuthStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/auth/login');
			return;
		}
		// Ensure we have the latest user data
		checkAuth();
	}, [isAuthenticated, navigate, checkAuth]);

	if (!isAuthenticated) {
		return null; // Prevent flash of content before redirect
	}

	if (!user) {
		return (
			<div className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800">
				<p className="text-center text-gray-300">Loading profile...</p>
			</div>
		);
	}

	return (
		<div className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'>
			<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
				Profile
			</h2>

			<div className='space-y-6'>
				<div className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Profile Information</h3>
					<p className='text-gray-300'>Name: {user?.username}</p>
					<p className='text-gray-300'>Email: {user?.email}</p>
				</div>
				<div className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Account Activity</h3>
					<p className='text-gray-300'>
						<span className='font-bold'>Joined: </span>
						{user?.createdAt && new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p className='text-gray-300'>
						<span className='font-bold'>Last Login: </span>
						{user?.lastLogin && formatDate(user.lastLogin)}
					</p>
				</div>
			</div>

			{/* <div
				className='mt-4'
			>
				<button
					onClick={handleLogout}
					className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
				>
					Logout
				</button>
			</div> */}
		</div>
	);
};