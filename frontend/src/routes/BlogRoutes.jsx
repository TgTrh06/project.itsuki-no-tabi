import { Routes, Route } from "react-router-dom";
import BlogPage from '../pages/blog/BlogPage'
import BlogDetailPage from '../pages/blog/BlogDetailPage'
import BlogCreatePage from '../pages/blog/BlogCreatePage'
// import BlogEditPage from '../pages/blog/BlogEditPage'

const BlogRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<BlogPage />} />
            <Route path="/create" element={<BlogCreatePage />} />
            {/* <Route path="/edit/:id" element={<BlogEditPage />} /> */}
            <Route path="/:slug" element={<BlogDetailPage />} />
        </Routes>
    );
}

export default BlogRoutes;