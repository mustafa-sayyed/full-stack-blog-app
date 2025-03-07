import mongoose from "mongoose";

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(() => console.log("Failed to connect MongoDB"));
};

export default connectMongoDB;
