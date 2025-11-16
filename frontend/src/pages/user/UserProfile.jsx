import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, Heart } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import api from '../../utils/api'

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export default function UserProfile() {
  const { user, isAuthenticated, checkAuth } = useAuthStore()
  const navigate = useNavigate()
  const [articleCount, setArticleCount] = useState(0)
  const [likeCount, setLikeCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verify = async () => {
      if (!isAuthenticated) {
        await checkAuth()
      }
    }
    verify()
  }, [isAuthenticated, checkAuth])

  useEffect(() => {
    if (!isAuthenticated || user?.role === 'admin') {
      navigate('/auth/login')
      return
    }

    const fetchStats = async () => {
      try {
        setLoading(true)
        // Fetch user's articles
        const artRes = await api.get(`/articles?author=${user?._id}`)
        setArticleCount(artRes.data.total || 0)
        
        // In a real app, you'd have an endpoint to get user's liked articles
        setLikeCount(0)
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user?._id) {
      fetchStats()
    }
  }, [isAuthenticated, user, navigate])

  if (!isAuthenticated || user?.role === 'admin') {
    return null
  }

  const joinDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A'

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen pt-20 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user?.name || user?.username}</h1>
              <p className="text-gray-600 mt-1">{user?.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Member Since</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">{joinDate}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">My Articles</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">
                  {loading ? '...' : articleCount}
                </p>
              </div>
              <User className="w-8 h-8 text-green-600" />
            </div>
          </motion.div>
        </div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-600">Full Name</label>
              <p className="text-lg text-gray-800 mt-1">{user?.name || user?.username}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Email</label>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-5 h-5 text-gray-600" />
                <p className="text-lg text-gray-800">{user?.email}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Account Type</label>
              <p className="text-lg text-gray-800 mt-1">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {user?.role === 'admin' ? 'Administrator' : 'Regular User'}
                </span>
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Member Since</label>
              <p className="text-lg text-gray-800 mt-1">{joinDate}</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4"
        >
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            Edit Profile
          </button>
          <button className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
            Change Password
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
