import { create } from "zustand";
import axios from "axios";

// URL for dev or deploy
const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";
axios.defaults.withCredentials = true;

const useBlogStore = create((set, get) => ({
  blogs: [],
  selectedBlog: null,
  loading: false,
  error: null,

  // Lấy tất cả blog
  fetchBlogs: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_URL}/blogs`);
      // backend returns { status, message, data: { posts } }
      const posts = res.data?.data?.posts || [];
      set({ blogs: posts, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error fetching blogs", loading: false });
    }
  },

  // Lấy blog theo id
  fetchBlogById: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_URL}/blogs/${id}`);
      // backend returns { success, data: { post } }
      const post = res.data?.data?.post || null;
      set({ selectedBlog: post, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error fetching blog", loading: false });
    }
  },

  // Tạo blog mới
  createBlog: async (data) => {
    try {
      const res = await axios.post(`${API_URL}/blogs`, data);
      const created = res.data?.data?.post || res.data;
      set({ blogs: [...get().blogs, created] });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error creating blog" });
    }
  },

  // Cập nhật blog
  updateBlog: async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/blogs/${id}`, data);
      const updated = res.data?.data?.post || res.data;
      set({
        blogs: get().blogs.map((b) => (b._id === id ? updated : b)),
      });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error updating blog" });
    }
  },

  // Xóa blog
  deleteBlog: async (id) => {
    try {
      await axios.delete(`${API_URL}/blogs/${id}`);
      set({ blogs: get().blogs.filter((b) => b._id !== id) });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error deleting blog" });
    }
  },
}));

export default useBlogStore;