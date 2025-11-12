import { Comment } from "../models/comment.model";

export const addComment = async (req, res) => {
    try {
        const { articleId, content } = req.body;
        const userId = req.user._id;

        const comment = await Comment.create({
            user: userId,
            article: articleId,
            content,
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};