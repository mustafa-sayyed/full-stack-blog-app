import { Schema, model } from "mongoose";
import { createHash, randomBytes } from "crypto";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      reuired: true,
    },
    salt: {
      type: String,
      reuired: true,
    },
    profileImage: {
      type: String,
      default: "/profileImages/default-profile.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHash("sha256", salt).update(this.password).digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.methods.checkPassword = function (password) {
  const hash = createHash("sha256", this.salt).update(password).digest("hex");
  return this.password === hash;
};

const User = model("User", userSchema);

export default User;
