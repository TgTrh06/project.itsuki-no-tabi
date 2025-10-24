import express from 'express';
import { 
    getAllPost, 
    getPost 
} from '../controllers/blog.controller.js';

const router = express.Router();

router.route("/")
    .get(getAllPost);
    
router.route("/:id")
    .get(getPost);

export default router;