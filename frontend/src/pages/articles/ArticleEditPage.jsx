import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '../../store/authStore'
import useDestinationStore from '../../store/destinationStore'
import InterestTagInput from '../../components/InterestTagInput'
import api from '../../utils/api'

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export default function ArticleEditPage(){
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuthStore()
  const { destinations, fetchDestinations } = useDestinationStore()

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    imageUrl: '',
    destination: '',
    interests: []
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/articles')
      return
    }
    fetchDestinations({ page: 1, limit: 100 }).catch(() => {})
  }, [user, navigate, fetchDestinations])

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setFetching(true)
        const res = await api.get(`/articles/${id}`)
        if (res.data.article) {
          const article = res.data.article
          setFormData({
            title: article.title || '',
            summary: article.summary || '',
            content: article.content || '',
            imageUrl: article.imageUrl || '',
            destination: article.destination?._id || article.destination || '',
            interests: article.interests || []
          })
        }
      } catch (err) {
        setError('Failed to load article')
        console.error(err)
      } finally {
        setFetching(false)
      }
    }

    if (id) {
      fetchArticle()
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleInterestChange = (interests) => {
    setFormData(prev => ({ ...prev, interests }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setFieldErrors({})

    try {
      const errors = {}
      if (!formData.title) errors.title = 'Title is required'
      if (!formData.summary) errors.summary = 'Summary is required'
      if (!formData.content) errors.content = 'Content is required'
      if (!formData.destination) errors.destination = 'Destination is required'

      if (Object.keys(errors).length) {
        setFieldErrors(errors)
        setLoading(false)
        return
      }

      const res = await api.put(`/articles/${id}/edit`, formData)
      if (res.data.success) {
        navigate('/admin/articles')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update article')
    } finally {
      setLoading(false)
    }
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  if (fetching) {
    return <div className="p-4 text-center">Loading article...</div>
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen pt-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Article</h1>
          <p className="text-gray-600">Update article content and metadata</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter article title"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {fieldErrors.title && <p className="mt-1 text-sm text-red-600">{fieldErrors.title}</p>}
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Summary *
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Brief summary (1-2 sentences)"
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
              {fieldErrors.summary && <p className="mt-1 text-sm text-red-600">{fieldErrors.summary}</p>}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your article content here..."
                rows={8}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                required
              />
              {fieldErrors.content && <p className="mt-1 text-sm text-red-600">{fieldErrors.content}</p>}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Destination */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Destination *
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a destination</option>
                  {destinations.map(dest => (
                    <option key={dest._id} value={dest._id}>
                      {dest.title}
                    </option>
                  ))}
                </select>
                {fieldErrors.destination && <p className="mt-1 text-sm text-red-600">{fieldErrors.destination}</p>}
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Interests
              </label>
              <InterestTagInput
                value={formData.interests}
                onChange={handleInterestChange}
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-sm text-red-700 font-semibold">{error}</p>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Article'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/articles')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2.5 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}
