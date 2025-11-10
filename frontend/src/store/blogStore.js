import { create } from 'zustand';
import axios from 'axios';

// URL for dev or deploy
const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/blogs" : "/api/blogs";
axios.defaults.withCredentials = true;

const useBlogStore = create((set, get) => ({
  blogList: [],
  pagination: { page: 1, limit: 9, total: 0, pages: 1, hasMore: false },
  selectedBlog: null,
  loading: false,
  error: null,

  // Lấy tất cả blog với phân trang
  fetchBlogs: async (page = 1, limit = 9) => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
      // backend returns { status, message, data: { blogs, pagination } }
      const blogs = res.data?.data?.blogs || [];
      const pagination = res.data?.data?.pagination || { page, limit, total: 0, pages: 1, hasMore: false };
      set({ blogList: blogs, pagination, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error fetching blogs", loading: false });
    }
  },  
  
  // Lấy blog theo id
  fetchBlogById: async (id) => {
    set({ loading: true, error: null, selectedBlog: null });
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      // backend returns { success, data: { blog } }
      const blog = res.data?.data?.blog || null;
      set({ selectedBlog: blog, loading: false });
      return blog;
    } catch (err) {
      console.error('Error fetching blog:', err?.response || err);
      set({ error: err.response?.data?.message || "Error fetching blog", loading: false });
      return null;
    }
  },

  // Lấy blog theo slug
  fetchBlogBySlug: async (slug) => {
    set({ loading: true, error: null, selectedBlog: null });
    try {
      const res = await axios.get(`${API_URL}/${slug}`);
      // backend returns { success, data: { blog } }
      const blog = res.data?.data?.blog || null;
      set({ selectedBlog: blog, loading: false });
      return blog;
    } catch (err) {
      console.error('Error fetching blog:', err?.response || err);
      set({ error: err.response?.data?.message || "Error fetching blog", loading: false });
      return null;
    }
  },

  // Tạo blog mới
  createBlog: async (data) => {
    try {
      const res = await axios.blog(`${API_URL}`, data);
      const created = res.data?.data?.blog || res.data;
      set({ blogList: [...get().blogs, created] });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error creating blog" });
    }
  },

  // Cập nhật blog
  updateBlog: async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data);
      const updated = res.data?.data?.blog || res.data;
      set({
        blogList: get().blogs.map((b) => (b._id === id ? updated : b)),
      });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error updating blog" });
    }
  },

  // Xóa blog
  deleteBlog: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set({ blogList: get().blogs.filter((b) => b._id !== id) });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error deleting blog" });
    }
  },
}));

export default useBlogStore;