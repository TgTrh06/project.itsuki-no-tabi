import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = {};

        console.log(req.query);

        const cat = req.query.cat;
        const author = req.query.author;
        const searchQuery = req.query.search;
        const sortQuery = req.query.sort;

        if (cat) {
            query.category = cat;
        }

        if (searchQuery) {
            query.title = { $regex: searchQuery, $options: "i" };
        }

        if (author) {
            query.author = author;
        }

        let sortObj = { createdAt: -1 };

        if (sortQuery) {
            switch (sortQuery) {
                case "newest":
                    sortObj = { createdAt: -1 };
                    break;
                case "oldest":
                    sortObj = { createdAt: 1 };
                    break;
                case "popular":
                    sortObj = { "meta.views": -1 };
                    break;
                case "trending":
                    sortObj = { "meta.views": -1 };
                    query.createdAt = {
                        $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
                    };
                    break;
                default:
                    break;
            }
        }

        // Show only published posts unless specifically requested
        if (!req.query.showAll) {
            query.isPublished = true;
        }

        const [posts, total] = await Promise.all([
            Post.find(query)
                .populate("author", "name email")
                .sort(sortObj)
                .skip(skip)
                .limit(limit),
            Post.countDocuments(query)
        ]);

        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
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
        console.log("Error in getAllPosts: ", error);
        res.status(500).json({
            success: false,
            message: "Error in getting all posts",
            error: error.message,
        });
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'username');

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        };

        // Increment views
        post.meta.views += 1;
        await post.save();

        res.status(200).json({
            success: true,
            message: "Post retrieved successfully",
            data: {
                post
            }
        });
    } catch (error) {
        console.log("Error in getPost: ", error);
        res.status(500).json({
            success: false,
            message: "Error in getting a single post",
            error: error.message,
        });
    }
};