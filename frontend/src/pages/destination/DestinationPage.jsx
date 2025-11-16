import { useEffect, useState } from 'react'
import JapanMap from '../../components/JapanMap'
import DestinationCard from '../../components/DestinationCard'
import useDestinationStore from '../../store/destinationStore'

export default function DestinationPage() {
  const { destinations, loading, fetchDestinations } = useDestinationStore()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchDestinations({ page: 1, limit: 100 }).catch(() => {})
  }, [])

  const filteredDestinations = destinations.filter(dest =>
    dest.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold mb-6">Destinations</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <JapanMap />
        </div>

        {/* Sidebar: Search + List */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-2">All Destinations</h2>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Scrollable List */}
          <div className="overflow-y-auto max-h-[500px] pr-1">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : filteredDestinations.length === 0 ? (
              <p className="text-gray-500">No destinations found.</p>
            ) : (
              <div className="space-y-2">
                {filteredDestinations.map(dest => (
                  <DestinationCard key={dest._id} dest={dest} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
