import express from "express";
import { editProfile, getUser } from "../controllers/user.js";
import multer from "multer";

const router = express.Router();

router.get("/:userId", getUser);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/users/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/edit-profile/:userId",
  upload.fields([{ name: "profile_image" }, { name: "cover_image" }]),
  editProfile
);

export default router;
