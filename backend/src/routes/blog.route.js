import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { 
    getAllBlogs, 
    getBlog,
} from '../controllers/blog.controller.js';
import increaseView from '../middleware/increaseView.js';

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/:slug", increaseView, getBlog);

// Protected routes - require authentication
// router.post("/", createBlog);
// router.put("/:id", updateBlog);
// router.delete("/:id", deleteBlog);
// router.post("/:id/like", toggleLikeBlog);

export default router;