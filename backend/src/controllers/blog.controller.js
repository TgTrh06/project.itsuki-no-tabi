import { Post } from "../models/post.model.js";

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({ status: 'published'})

        res.status(200).json({
            status: 'success',
            message: 'Get all posts successfully',
            data: {
                ...posts._doc
            }
        })
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
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
        res.status(404).json({ success: false, message: error.message });
    }
}