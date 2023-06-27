import express from "express";
import {
  addPost,
  uploadFile,
  getPosts,
  getUserPosts,
  deletePost,
} from "../controllers/post.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (res, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload-file", upload.single("image"), uploadFile);

router.post("/", addPost);
router.get("/", getPosts);

router.get("/user/:userId", getUserPosts);

router.delete("/:postId", deletePost);

export default router;
