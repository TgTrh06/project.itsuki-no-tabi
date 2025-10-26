import { useEffect } from "react";
import BlogCard from "../../components/BlogCard";
import useBlogStore from "../../store/blogStore";

export default function BlogPage() {
    const { blogs, fetchBlogs, loading } = useBlogStore();

    useEffect(() => {
        fetchBlogs();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!blogs || blogs.length === 0) return <p className="text-center mt-10">No blogs found.</p>;

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="mb-3 text-3xl font-bold text-center">Memories</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </div>
    );
}