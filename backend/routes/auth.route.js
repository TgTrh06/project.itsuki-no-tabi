import express from 'express';
import {
    signup,
    login,
    logout,
    verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup); 
router.post('/logout', logout); 

router.post('/verify-email', verifyEmail);
// router.post('/forgotPassword',)

export default router;