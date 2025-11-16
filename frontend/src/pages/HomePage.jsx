import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export default function HomePage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h1 className="text-5xl font-bold text-blue-700 mb-4">Explore Japan</h1>
          <p className="text-gray-700 text-lg">
            Discover the beauty of Japan with <span className="font-semibold text-blue-600">Itsuki no Tabi</span>. From bustling cities to serene countryside, embark on a journey like no other.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-center gap-4 mb-12"
        >
          <Link
            to="/destinations"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View Destinations
          </Link>
          <Link
            to="/articles"
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Read Travel Articles
          </Link>
        </motion.div>

        {/* Highlights Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "🌸 Culture & Traditions",
              desc: "Experience Japan’s rich heritage through temples, festivals, and timeless customs."
            },
            {
              title: "🏞️ Nature & Scenery",
              desc: "From Mount Fuji to cherry blossoms, explore breathtaking landscapes across the islands."
            },
            {
              title: "🍣 Food & Lifestyle",
              desc: "Indulge in sushi, ramen, and street food while embracing the vibrant local life."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-blue-700 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
