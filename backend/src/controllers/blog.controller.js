import { Post } from "../models/post.model.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            message: 'Get all posts successfully',
            data: {
                posts
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Cannot find post with this ID."});
        }

        res.status(200).json({
            success: true,
            data: {
                post
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}