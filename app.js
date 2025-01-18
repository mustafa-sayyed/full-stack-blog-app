import express from "express";
import staticRouter from "./routes/staticRouter.js";
import blogRouter from "./routes/blogRouter.js";
import connectMongoDB from "./connection.js";
import authRouter from "./routes/authRouter.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;
connectMongoDB("mongodb://localhost:27017/Blog-App");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", staticRouter, authRouter);

app.use("/", authMiddleware, blogRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
