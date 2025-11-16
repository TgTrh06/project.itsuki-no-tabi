import { Routes, Route } from "react-router-dom";
import AdminProfile from "../pages/admin/AdminProfile";
import AdminArticlePage from "../pages/admin/AdminArticlePage";
import ArticleCreatePage from "../pages/articles/ArticleCreatePage";
import AdminUserPage from "../pages/admin/AdminUserPage";
import AdminDestinationPage from "../pages/admin/AdminDestinationPage";
import ArticleEditPage from "../pages/articles/ArticleEditPage";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/profile" element={<AdminProfile />} />

            <Route path="/articles" element={<AdminArticlePage />} />
            <Route path="/articles/create" element={<ArticleCreatePage />} />
            <Route path="/articles/:id/edit" element={<ArticleEditPage />} />

            <Route path="/users" element={<AdminUserPage />} />

            <Route path="/destinations" element={<AdminDestinationPage />} />
        </Routes>
    );
};

export default AdminRoutes;
