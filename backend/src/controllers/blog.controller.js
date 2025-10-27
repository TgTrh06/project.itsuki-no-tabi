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

// Create new post
export const createPost = async (req, res) => {
    try {
        const { title, content, tags, status = 'draft' } = req.body;

        const post = await Post.create({
            title,
            content,
            author: req.userId, // from auth middleware
            tags: tags || [],
            status
        });

        await post.populate('author', 'name');

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: { post }
        });
    } catch (error) {
        console.error("Error in createPost:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error creating post",
            error: error.message 
        });
    }
};

// Update post
export const updatePost = async (req, res) => {
    try {
        const { title, content, tags, status, isPublished } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ 
                success: false, 
                message: "Post not found" 
            });
        }

        // Check ownership unless admin
        if (post.author.toString() !== req.userId) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized to update this post" 
            });
        }

        // Update fields if provided
        if (title) post.title = title;
        if (content) post.content = content;
        if (tags) post.tags = tags;
        if (status) post.status = status;
        if (typeof isPublished === 'boolean') post.isPublished = isPublished;

        await post.save();
        await post.populate('author', 'name');

        res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: { post }
        });
    } catch (error) {
        console.error("Error in updatePost:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error updating post",
            error: error.message 
        });
    }
};

// Delete post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ 
                success: false, 
                message: "Post not found" 
            });
        }

        // Check ownership unless admin
        if (post.author.toString() !== req.userId) {
            return res.status(403).json({ 
                success: false, 
                message: "Not authorized to delete this post" 
            });
        }

        await post.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            data: { id: req.params.id }
        });
    } catch (error) {
        console.error("Error in deletePost:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error deleting post",
            error: error.message 
        });
    }
};

// Toggle like post
export const toggleLikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ 
                success: false, 
                message: "Post not found" 
            });
        }

        post.likes += 1;
        await post.save();

        res.status(200).json({
            success: true,
            message: 'Post liked successfully',
            data: { likes: post.likes }
        });
    } catch (error) {
        console.error("Error in toggleLikePost:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error liking post",
            error: error.message 
        });
    }
};