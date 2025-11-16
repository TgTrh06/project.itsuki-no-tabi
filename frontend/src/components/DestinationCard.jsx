import { Link } from 'react-router-dom'

export default function DestinationCard({ dest }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-lg text-blue-700 mb-1">
        <Link to={`/destinations/${dest.slug}`}>{dest.title}</Link>
      </h3>
      <Link
        to={`/destinations/${dest.slug}`}
        className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
      >
        View articles →
      </Link>
    </div>
  )
}
