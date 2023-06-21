import express from "express";

const router = express.Router();

router.get("/post/:idPost", (res, req) => {});

router.get("/posts", (res, req) => {});

router.post("/post", (res, req) => {});
router.delete("/post/:idPost", (res, req) => {});

export default router;
