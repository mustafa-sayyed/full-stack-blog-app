import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      reuired: true,
    },
    image: {
      type: String,
      reuired: true,
    },
    slug: {
      type: String,
      reuired: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  const slug = this.title.split(" ").join("-");
  this.slug = slug;
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
