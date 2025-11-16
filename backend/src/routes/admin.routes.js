import express from 'express'

import { 
    deleteUser, 
    getAllUsers, 
    getUserById, 
    getUserCount, 
    updateUser 
} from '../controllers/user.controller.js';
import { getArticleCount } from '../controllers/article.controller.js';

const router = express.Router();

router.get('/users', getAllUsers)
router.get('/users/count', getUserCount)
router.get('/users/:id', getUserById)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

router.get('/articles/count', getArticleCount)

export default router;
