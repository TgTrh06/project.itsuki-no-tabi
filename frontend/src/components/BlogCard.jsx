import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
    const id = blog._id || blog.id;

    return (
        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-200 overflow-hidden">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="font-semibold text-xl mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3">{blog.description || blog.content}</p>
                {id ? (
                    <Link
                        to={`/blogs/${id}`}
                        className="inline-block mt-3 text-blue-500 hover:underline text-sm font-medium"
                    >
                        Detail -&gt;
                    </Link>
                ) : (
                    <span className="inline-block mt-3 text-gray-400 text-sm">No details</span>
                )}
            </div>
        </div>
    );
}