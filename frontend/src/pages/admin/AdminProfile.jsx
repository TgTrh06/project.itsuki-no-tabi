import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart3, Users, FileText, Eye } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import AdminLayout from '../../components/AdminLayout'
import api from '../../utils/api'

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

function StatCard({ stat, delay }) {
  const Icon = stat.icon
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-semibold">{stat.label}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
        </div>
        <div className={`${colorClasses[stat.color]} p-3 rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  )
}

export default function AdminProfile() {
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [stats, setStats] = useState([])

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/auth/login')
    }
  }, [isAuthenticated, user, navigate])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, articleRes] = await Promise.all([
          api.get('/admin/users/count'),
          api.get(`/admin/articles/count?authorId=${user._id}`)
        ])

        setStats([
          { label: 'Your Articles', value: articleRes.data.count || 0, icon: FileText, color: 'blue' },
          { label: 'Total Users', value: userRes.data.count || 0, icon: Users, color: 'purple' },
        ])
      } catch (err) {
        console.error('Failed to fetch stats:', err)
      }
    }

    fetchStats()

    const interval = setInterval(() => {
      fetchStats()
    }, 30000)

    return () => clearInterval(interval)
  }, [user])

  if (!isAuthenticated || user?.role !== 'admin') {
    return null
  }

  return (
    <AdminLayout>
      <motion.div initial="hidden" animate="visible" exit="exit" variants={pageVariants}>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
          <p className="text-sm text-gray-600">Welcome, {user?.name || user?.username}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} delay={idx * 0.1} />
          ))}
        </div>
      </motion.div>
    </AdminLayout>
  )
}
