import mongoose from "mongoose";

const connectMongoDB = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB Connected"))
    .catch(() => console.log("Failed to connect MongoDB"));
};

export default connectMongoDB;
