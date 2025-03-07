import express from "express";
import multer from "multer";
import Blog from "../models/blog.js";
import { handleCreateBlog } from "../controllers/blogController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/blogImages/");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

router.post("/add-blog", upload.single("image"), handleCreateBlog);

router.get("/blog/:slug", async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  res.status(200).render("blog", { blog: blog, user: req.user });
});

router.get("/my-blog", async (req, res) => {
  const blogs = await Blog.find({ createdBy: req.user._id });
  res.render("my-blogs", { blogs, user: req.user });
});

export default router;
