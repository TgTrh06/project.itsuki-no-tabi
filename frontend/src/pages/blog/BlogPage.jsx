import { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard";

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/blogs")
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="mb-3 text-3xl font-bold text-center">Memomries</h1>
            <div className="grid md:grid-colls-3 gap-6">
                {blogs.map(blog => (
                    <BlogCard key={blog._id} blog={blog}/>
                ))}
            </div>
        </div>
    );
}