import express from "express";
import {
  editProfile,
  followOrUnfollow,
  getUser,
  testRelationhip,
} from "../controllers/user.js";
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

router.post("/follow-unfollow/:followerId/:followingId", followOrUnfollow);
router.get("/test-relationship/:followerId/:followingId", testRelationhip);
export default router;
