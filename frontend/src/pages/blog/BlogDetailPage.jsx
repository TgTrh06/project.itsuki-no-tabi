import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useBlogStore from "../../store/blogStore";
import { formatDate } from "../../utils/date";

export default function BlogDetailPage() {
    const { id } = useParams();
    const { selectedBlog, fetchBlogById, loading } = useBlogStore();

    useEffect(() => {
        fetchBlogById(id);
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!selectedBlog) return <p className="text-center mt-10">Blog not found.</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="mb-3 text-3xl font-bold text-center">{selectedBlog.title}</h1>
            <p className="mb-6 text-center text-gray-600">On {formatDate(selectedBlog.createdAt)}</p>
            <div className="prose prose-lg">
                <p>{selectedBlog.content}</p>
            </div>
        </div>
    );
}