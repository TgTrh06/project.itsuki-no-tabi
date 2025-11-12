import express from "express";

import { verifyToken } from "../middleware/auth.middleware";
import { addComment } from "../controllers/comment.controller";

const router = express.Router();

// General

// Admin only

// Interact
router.post("/:id/comment", verifyToken, addComment);

export default router;