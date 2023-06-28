import express from "express";
import { addComment, getPostComments } from "../controllers/comments.js";

const router = express.Router();

router.post("/", addComment);
router.get("/post-comments/:postId", getPostComments);

export default router;
