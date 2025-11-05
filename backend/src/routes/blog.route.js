import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { 
    getAllPosts, 
    getPost,
} from '../controllers/post.controller.js';

const router = express.Router();

// Public routes
router.get("/", getAllPosts);
router.get("/:id", getPost);

// Protected routes - require authentication
// router.use(verifyToken);
// // router.post("/", createPost);
// router.put("/:id", updatePost);
// router.delete("/:id", deletePost);
// router.post("/:id/like", toggleLikePost);

export default router;