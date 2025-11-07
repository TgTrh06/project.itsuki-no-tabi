import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    img: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
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
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    meta: {
      views: { type: Number, default: 0, min: 0 },
    },
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

export const Post = mongoose.model("Post", postSchema);
// export default mongoose.model("Post", postSchema);
