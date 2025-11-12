import express from 'express';
import {
    register,
    login,
    logout,
    checkAuth
} from "../controllers/auth.controller.js";
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register); 
router.post('/logout', logout); 
router.get('/me', verifyToken, checkAuth)

// router.post('/verify-email', verifyEmail);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password/:token', resetPassword);

export default router;