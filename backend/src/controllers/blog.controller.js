import { Post } from "../models/post.model.js";

// Get all posts with pagination and filters
export const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build query based on filters
        const query = {};
        if (req.query.tag) query.tags = req.query.tag;
        if (req.query.status) query.status = req.query.status;
        if (req.query.author) query.author = req.query.author;

        // If not admin/author, only show published posts
        if (!req.query.showAll) {
            query.isPublished = true;
        }

        const [posts, total] = await Promise.all([
            Post.find(query)
                .populate('author', 'name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Post.countDocuments(query)
        ]);

        res.status(200).json({
            success: true,
            message: 'Posts retrieved successfully',
            data: {
                posts,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        console.error("Error in getAllPosts:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error retrieving posts",
            error: error.message 
        });
    }
};

// Get single post by ID
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name');

        if (!post) {
            return res.status(404).json({ 
                success: false, 
                message: "Post not found" 
            });
        }

        // Increment views
        post.meta.views += 1;
        await post.save();

        res.status(200).json({
            success: true,
            message: 'Post retrieved successfully',
            data: { post }
        });
    } catch (error) {
        console.error("Error in getPost:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error retrieving post",
            error: error.message 
        });
    }
};

