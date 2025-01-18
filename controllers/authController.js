import { setUser } from "../auth.js";
import User from "../models/user.js";

const handleUserSignup = async (req, res) => {
  const { fullName, email, password } = req.body;
  const profileImage = req.file.path.slice(7);
  const result = await User.create({
    fullName,
    email,
    password,
    profileImage,
  });

  res.status(201).redirect("/signin");
};

const handleUserSignin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).render("signin", { error: "User does not exist" });
  }
  if (user.checkPassword(password)) {
    const token = setUser(user);
    res.cookie("token", token);
    res.status(200).redirect("/");
  } else {
    res.render("signin", { error: "Invalid password" });
  }
};

export { handleUserSignin, handleUserSignup };
