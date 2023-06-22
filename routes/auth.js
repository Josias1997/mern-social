import express from "express";
import db from "../connect.js";
import bcrypt from "bcryptjs";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", (req, res) => {});

export default router;
