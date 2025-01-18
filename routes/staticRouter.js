import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import Blog from "../models/blog.js";

const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/", authMiddleware, async (req, res) => {
  const blogs = await Blog.find({});
  res.render("home", { user: req.user, blogs });
});

router.get("/add-blog", authMiddleware, (req, res) => {
  res.render("add-blog");
});


export default router;
