import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBlogStore from "../../store/blogStore";
import useAuthStore from "../../store/authStore";
import { ArrowLeft, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function BlogCreatePage() {
    const navigate = useNavigate();
    const { createBlog, loading, error } = useBlogStore();
    const { isAuthenticated } = useAuthStore();
    const [form, setForm] = useState({ 
        title: "", 
        content: "", 
        img: "",
        tags: "",
        status: "draft",
        isPublished: false
    });

    // Redirect if not authenticated
    if (!isAuthenticated) {
        navigate("/auth/login");
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.title.trim() || !form.content.trim()) {
            toast.error("Title and content are required");
            return;
        }

        try {
            const tagsArray = form.tags 
                ? form.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
                : [];

            const blogData = {
                title: form.title.trim(),
                content: form.content.trim(),
                img: form.img.trim() || undefined,
                tags: tagsArray,
                status: form.status,
                isPublished: form.isPublished
            };

            await createBlog(blogData);
            toast.success("Blog created successfully!");
            navigate("/blogs");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error creating blog");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Link 
                to="/blogs" 
                className="inline-flex items-center text-green-400 hover:text-green-500 mb-6 transition"
            >
                <ArrowLeft className="size-4 mr-2" />
                Back to Blogs
            </Link>

            <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Create New Blog
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500 bg-opacity-20 text-red-400 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-2">Title *</label>
                        <input 
                            type="text" 
                            placeholder="Enter blog title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full p-3 bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Content *</label>
                        <textarea
                            placeholder="Write your blog content here..."
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            rows={12}
                            className="w-full p-3 bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Image URL (optional)</label>
                        <input 
                            type="url" 
                            placeholder="https://example.com/image.jpg"
                            value={form.img}
                            onChange={(e) => setForm({ ...form, img: e.target.value })}
                            className="w-full p-3 bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Tags (comma-separated)</label>
                        <input 
                            type="text" 
                            placeholder="travel, japan, adventure"
                            value={form.tags}
                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                            className="w-full p-3 bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-300 mb-2">Status</label>
                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                className="w-full p-3 bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div className="flex items-center pt-8">
                            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.isPublished}
                                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                                    className="w-4 h-4 rounded"
                                />
                                <span>Publish immediately</span>
                            </label>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <Loader className="animate-spin size-5 mr-2" />
                                Creating...
                            </span>
                        ) : (
                            "Create Blog"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}