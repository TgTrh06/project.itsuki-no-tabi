import mongoose from "mongoose";
import { Article } from "../models/article.model";
import { Destination } from "../models/destination.model.js";
import { User } from "../models/user.model.js";

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        summary: {
            type: String
        },
        content: {
            type: String
        },
        imageUrl: {
            type: String
        },
        meta: {
            views: { type: Number, default: 0 },
            // likes stores user list that liked the article
            likes: [
                { 
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }
            ]
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        destination: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Destination",
            required: true,
        },
        interests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Interest",
            }
        ],
    },
    { timestamps: true }
);

export const Article = mongoose.model("Article", articleSchema);