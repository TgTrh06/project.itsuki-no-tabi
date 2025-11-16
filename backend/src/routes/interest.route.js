import express from "express"
import { getAllInterests, getInterestBySlug, createInterest } from "../controllers/interest.controller.js"
import { verifyAdmin, verifyToken } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/", getAllInterests)
router.get("/:slug", getInterestBySlug)
router.post("/", verifyToken, verifyAdmin, createInterest)

export default router
