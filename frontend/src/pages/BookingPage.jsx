import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, DollarSign } from 'lucide-react'

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const bookingOptions = [
  {
    id: 1,
    title: 'Tokyo Classic Tour',
    destination: 'Tokyo',
    duration: '5 Days / 4 Nights',
    price: '$1,299',
    description: 'Experience the vibrant energy of Tokyo with visits to historic temples, modern districts, and traditional markets.',
    image: '🏯'
  },
  {
    id: 2,
    title: 'Kyoto Cultural Experience',
    destination: 'Kyoto',
    duration: '4 Days / 3 Nights',
    price: '$1,099',
    description: 'Immerse yourself in ancient Japanese culture with temple visits, traditional tea ceremonies, and geisha district tours.',
    image: '🏮'
  },
  {
    id: 3,
    title: 'Osaka Food Adventure',
    destination: 'Osaka',
    duration: '3 Days / 2 Nights',
    price: '$799',
    description: 'Discover the culinary capital of Japan with street food tours, cooking classes, and local market visits.',
    image: '🍜'
  },
  {
    id: 4,
    title: 'Onsen & Mountain Retreat',
    destination: 'Hakone',
    duration: '3 Days / 2 Nights',
    price: '$999',
    description: 'Relax in traditional hot springs while enjoying mountain scenery and authentic Japanese hospitality.',
    image: '♨️'
  },
  {
    id: 5,
    title: 'Hiroshima Peace Tour',
    destination: 'Hiroshima',
    duration: '2 Days / 1 Night',
    price: '$599',
    description: 'Pay respects and learn about Japan\'s history at the Peace Memorial Park and Museum.',
    image: '🕊️'
  },
  {
    id: 6,
    title: 'Hokkaido Winter Wonderland',
    destination: 'Hokkaido',
    duration: '6 Days / 5 Nights',
    price: '$1,599',
    description: 'Experience the stunning snow festivals, skiing, and winter sports in Japan\'s northern paradise.',
    image: '❄️'
  }
]

function BookingCard({ option, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="text-6xl text-center py-8 bg-gradient-to-r from-blue-100 to-blue-50">
        {option.image}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h3>
        
        <div className="space-y-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>{option.destination}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>{option.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <span className="text-lg font-semibold text-gray-800">{option.price}</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-6">{option.description}</p>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          Book Now
        </button>
      </div>
    </motion.div>
  )
}

export default function BookingPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen pt-20 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Plan Your Japan Adventure
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our curated travel packages and experience the beauty, culture, and cuisine of Japan.
            All packages include accommodations, guided tours, and local experiences.
          </p>
        </motion.div>

        {/* Booking Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {bookingOptions.map((option, idx) => (
            <BookingCard key={option.id} option={option} delay={idx * 0.1} />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Help?</h2>
          <p className="text-gray-700 mb-6">
            Our travel specialists are here to help customize your perfect Japan itinerary.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            Contact Our Team
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
