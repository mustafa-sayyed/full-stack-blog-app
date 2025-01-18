import { getUser } from "../auth.js";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/signin");
  const user = getUser(token);
  if (!user) return res.redirect("/signin");
  req.user = user;
  next();
};

export default authMiddleware;
