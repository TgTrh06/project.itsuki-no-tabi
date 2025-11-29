import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import useArticleStore from "../../store/articleStore"
import useInterestStore from "../../store/interestStore"
import useDestinationStore from "../../store/destinationStore"
import ArticleCard from "../../components/ArticleCard"

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export default function ArticleListPage() {
  const { articles, page, pages, loading, fetchArticles, fetchTopArticles } = useArticleStore()
  const { interests, fetchInterests } = useInterestStore()
  const { destinations, fetchDestinations } = useDestinationStore()
  
  const [topArticles, setTopArticles] = useState([])
  const [filters, setFilters] = useState({
    interest: '',
    destination: '',
  })

  useEffect(() => {
    fetchArticles({ page: 1, limit: 10 }).catch(() => { })
    fetchInterests().catch(() => { })
    fetchDestinations({ page: 1, limit: 50 }).catch(() => { })
    
    // Fetch top 10 articles
    fetchTopArticles(10).then(top => {
      setTopArticles(top || [])
    }).catch(() => { })
  }, [])
  
  // Debug log
  useEffect(() => {
    console.log('Interests:', interests)
    console.log('Destinations:', destinations)
  }, [interests, destinations])
  
  useEffect(() => {
    fetchArticles({ 
      page: 1, 
      limit: 10, 
      interest: filters.interest,
      destination: filters.destination 
    }).catch(() => { })
  }, [filters])

    const gotoPage = (p) => {
    if (p < 1 || p > pages) return
    fetchArticles({ 
      page: p, 
      limit: 10,
      interest: filters.interest,
      destination: filters.destination 
    }).catch(() => { })
  }
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }
  
  const clearFilters = () => {
    setFilters({ interest: '', destination: '' })
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-4"
        >
          <h1 className="text-4xl font-bold text-gray-900 mt-5">Articles</h1>
          <p className="text-gray-600">Explore travel stories and guides</p>
        </motion.div>

        {/* Content Section: Article List + Side Tab */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Article List: 6/10 */}
          <div className="md:w-7/10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
            >
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : (
                <div className="flex flex-col gap-6">
                  {articles.map((a) => (
                    <ArticleCard key={a._id} article={a} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  disabled={page <= 1}
                  onClick={() => gotoPage(page - 1)}
                  className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <span className="text-gray-700 font-medium">
                  Page {page} / {pages}
                </span>
                <button
                  disabled={page >= pages}
                  onClick={() => gotoPage(page + 1)}
                  className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </div>

                    {/* Side Tab: Filters + Top 10 */}
          <div className="md:w-3/10 w-full space-y-6">
            {/* Filters Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Filters</h2>
              
              {/* Interest Filter */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interest
                </label>
                <select
                  value={filters.interest}
                  onChange={(e) => handleFilterChange('interest', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">All Interests</option>
                  {interests && interests.length > 0 ? (
                    interests.map((interest) => (
                      <option key={interest._id} value={interest.slug}>
                        {interest.title}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </select>
              </div>
              
              {/* Destination Filter */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Destination
                </label>
                <select
                  value={filters.destination}
                  onChange={(e) => handleFilterChange('destination', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">All Destinations</option>
                  {destinations && destinations.length > 0 ? (
                    destinations.map((dest) => (
                      <option key={dest._id} value={dest.slug}>
                        {dest.title}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </select>
              </div>
              
              {/* Clear Filters Button */}
              {(filters.interest || filters.destination) && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors text-sm"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
            
            {/* Top 10 Most Viewed Articles */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔥 Top 10 Most Viewed</h2>
              <div className="space-y-3">
                {topArticles.length === 0 ? (
                  <p className="text-sm text-gray-500">No articles yet</p>
                ) : (
                  topArticles.map((article, index) => (
                    <Link
                      key={article._id}
                      to={`/articles/${article.destination?.slug || ''}/${article.slug}`}
                      className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors group"
                    >
                      <span className="text-lg font-bold text-gray-400 group-hover:text-blue-500 transition-colors min-w-[24px]">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {article.meta?.views || 0} views
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
