import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requied: true
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artical",
        required: true
    },
    content: {
        type: String,
        requied: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const Comment = mongoose.model("Comment", commentSchema);