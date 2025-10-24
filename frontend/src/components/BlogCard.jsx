import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
    return (
        <div className="bg-white rounded-2xl shadow hover:shadow-lg trasition duration-200 overflow-hidden">
            <img src="{blog.imageUrl}" alt="{blog.title}" className="w-full h-48 object-cover"/>
            <div className="p-4">
                <h2 className="font-semibold text-xl mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3">{blog.description}</p>
                <Link 
                    to={`/blog/${blog._id}`}
                    className="inline-block mt-3 text-blue-500 hover:underline text-sm font-medium"
                >
                    Detail -{`'>'`}
                </Link>
            </div>
        </div>
    )
}