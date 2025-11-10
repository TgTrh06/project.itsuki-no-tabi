import { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard";
import useBlogStore from "../../store/blogStore";

export default function BlogPage() {
    const { blogList, fetchBlogs, loading, pagination } = useBlogStore();
    const [page, setPage] = useState(1);
    const limit = pagination?.limit || 9;

    useEffect(() => {
        fetchBlogs(page, limit);
    }, [page, limit]);


    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!blogList || blogList.length === 0) return <p className="text-center mt-10">No blogs found.</p>;

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="mb-3 text-3xl font-bold text-center">Memories</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {blogList.map((blog) => (
                    <BlogCard key={blog.slug} blog={blog} />
                ))}
            </div>
            {/* Pagination controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
                <button
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                >
                    Prev
                </button>
                <span className="font-medium">
                    Page {pagination?.page || page} / {pagination?.pages || 1}
                </span>
                <button
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
                    onClick={() => setPage((p) => (pagination?.pages ? Math.min(pagination.pages, p + 1) : p + 1))}
                    disabled={pagination && page >= pagination.pages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}