import { Article } from "../models/article.model.js";
import { Comment } from "../models/comment.model.js";
import { Destination } from "../models/destination.model.js";
import slugify from "../utils/slugify.js";

// Get all articles
export const getAllArticles = async (req, res) => {
    try {
        const filter = {};
        if (req.query.destination) filter.destination = req.query.destination;
        if (req.query.author) filter.author = req.query.author;
        if (req.query.interest) {
            // Support both interest slug and ID
            const { Interest } = await import("../models/interest.model.js");
            const interest = await Interest.findOne({ $or: [{ slug: req.query.interest }, { _id: req.query.interest }] });
            if (interest) {
                filter.interests = interest._id;
            }
        }

        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const skip = (page - 1) * limit;

        const total = await Article.countDocuments(filter);
        const articles = await Article.find(filter)
            .populate("author", "name email")
            .populate("destination", "title slug")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const pages = Math.ceil(total / limit) || 1;

        res.status(200).json({ data: articles, total, page, pages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get article by ID
export const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await Article.findById(id)
            .populate("author", "name email")
            .populate("destination", "title slug");

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json({ article });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get article by slug
export const getArticleByCityAndSlug = async (req, res) => {
    try {
        const { citySlug, articleSlug } = req.params;

        // Find destination by slug
        const destination = await Destination.findOne({ slug: citySlug });
        if (!destination) {
            return res.status(404).json({ message: "Destination not found" });
        }

        // Find article by slug and destination
        const article = await Article.findOne({
            slug: articleSlug,
            destination: destination._id
        }).populate("author", "name avatar").populate("destination", "title");

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        // Increase view (stored under meta.views)
        article.meta = article.meta || {};
        article.meta.views = (article.meta.views || 0) + 1;
        await article.save();

        // Get comments of current article
        const comments = await Comment.find({ article: article._id })
            .populate("user", "name avatar")
            .sort({ createdAt: -1 });

        // Return both article and comments as an object
        res.status(200).json({ article, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create an article
export const createArticle = async (req, res) => {
    try {
        const { title, summary, content, imageUrl, destination, interests } = req.body;

        if (!title) { return res.status(400).json({ message: "Article title is required" }) };
        if (!summary) { return res.status(400).json({ message: "Article summary is required" }) };
        if (!content) { return res.status(400).json({ message: "Article content is required" }) };
        if (!destination) { return res.status(400).json({ message: "Article destination is required" }) };
        if (!interests) { return res.status(400).json({ message: "Article interest is required" }) };

        const article = await Article.create({
            title,
            slug: slugify(title),
            summary,
            content,
            imageUrl,
            author: req.user._id,
            destination,
            interests: interests
        });

        // Add article reference to destination
        await Destination.findByIdAndUpdate(destination, { $push: { articles: article._id } });

        res.status(201).json({
            success: true,
            message: "Article created successfully",
            article
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update article
export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updated = await Article.findByIdAndUpdate(id, data, { new: true });

        if (!updated) return res.status(404).json({ message: 'Article not found' });

        res.status(200).json({
            success: true,
            message: "Article updated successfully",
            article: updated
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete article
export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await Article.findByIdAndDelete(id);
        if (!article) return res.status(404).json({ message: 'Article not found' });

        // Remove reference from destination
        await Destination.findByIdAndUpdate(article.destination, { $pull: { articles: article._id } });

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Toggle like the article
export const likeArticle = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await Article.findById(id);
        if (!article) return res.status(404).json({ message: 'Article not found' });

        const userId = req.user._id;
        article.meta = article.meta || {};
        article.meta.likes = article.meta.likes || [];

        const isLiked = article.meta.likes.find((u) => u.toString() === userId.toString());
        if (isLiked) {
            article.meta.likes = article.meta.likes.filter((u) => u.toString() !== userId.toString());
        } else {
            article.meta.likes.push(userId);
        }

        await article.save();

        res.status(200).json({ likesCount: article.meta.likes.length });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getArticleCount = async (req, res) => {
    const { authorId } = req.query

    if (authorId && authorId !== 'undefined') {
        const count = await Article.countDocuments({ author: authorId })
        return res.json({ count })
    }

    const count = await Article.countDocuments()
    res.json({ count })
};

