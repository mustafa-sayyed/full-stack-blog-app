import jwt from "jsonwebtoken";
import "dotenv/config";

const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImage: user.profileImage,
    },
    process.env.JWT_SECRET
  );
};

const getUser = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { getUser, setUser };
