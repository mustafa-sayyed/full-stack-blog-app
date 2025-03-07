import { setUser } from "../auth.js";
import User from "../models/user.js";

const handleUserSignup = async (req, res) => {
  const { fullName, email, password } = req.body;
  const result = [fullName, email, password].some((val) => val.trim() === "" )
  if (result) {
    return res.status(400).render("signup", { error: "All Fields are to required." });
  }
  const profileImage = req.file.path.slice(7);
  try {
    await User.create({
      fullName,
      email,
      password,
      profileImage,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).render("signup", { error: `${Object.keys(error.keyValue)} already exist.` });
    }
    return res.status(400).render("signup", { error: "Failed to create user" });
  }

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
