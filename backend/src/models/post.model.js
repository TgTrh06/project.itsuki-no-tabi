import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    // likes: {
    //   type: Number,
    //   default: 0,
    //   min: 0,
    // },
    // meta: {
    //   views: { type: Number, default: 0, min: 0 },
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
  },
  { timestamps: true }
);

postSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for common queries
postSchema.index({ author: 1, status: 1, createdAt: -1 });

export const Post = mongoose.model("Post", postSchema);