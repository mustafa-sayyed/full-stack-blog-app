import express from "express";
import multer from "multer";
import { handleUserSignin, handleUserSignup } from "../controllers/authController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profileImages/");
  },
  filename: function (req, file, cb) {
    console.log(file);

    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

router.post("/signup", upload.single("profileImage"), handleUserSignup);

router.post("/signin", handleUserSignin);

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/signin");
});

export default router;
