import { useEffect } from "react"
import { motion } from "framer-motion"
import useArticleStore from "../../store/articleStore"
import ArticleCard from "../../components/ArticleCard"

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export default function ArticleListPage() {
  const { articles, page, pages, loading, fetchArticles } = useArticleStore()

  useEffect(() => {
    fetchArticles({ page: 1, limit: 10 }).catch(() => { })
  }, [])

  const gotoPage = (p) => {
    if (p < 1 || p > pages) return
    fetchArticles({ page: p, limit: 10 }).catch(() => { })
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

          {/* Side Tab: 4/10 */}
          <div className="md:w-3/10 w-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Highlights</h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>🌟 Top-rated articles</li>
                <li>📍 Popular destinations</li>
                <li>🧭 Travel tips & tricks</li>
                <li>🗓️ Seasonal guides</li>
              </ul>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Want to contribute?</h3>
                <p className="text-xs text-gray-500">
                  If you're an admin, you can create new articles from the dashboard.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
