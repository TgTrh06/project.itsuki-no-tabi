import { useState } from "react";
import useBlogStore from "../store/blogStore";
import { useNavigate } from "react-router-dom";

export default function BlogForm() {
    const { createBlog } = useBlogStore();
    const [form, setForm] = useState({ title: "", content: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createBlog(form);
        navigate("/blogs");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
            <h2 className="mb-4 text-2xl font-bold text-center">Create New Blog</h2>
            <input 
                type="text" 
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <textarea
                placeholder="Content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full mb-4 p-2 border border-gray-300 rounded h-40"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Submit
            </button>
        </form>
    );
}