import Blog from "../models/blog.js";

const handleCreateBlog = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file.path.slice(7);
  await Blog.create({
    title,
    content,
    image,
    createdBy: req.user._id,
  });
  res.status(201).redirect("/");
};

export { handleCreateBlog };
