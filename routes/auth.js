import express from "express";
import db from "../connect.js";
import bcrypt from "bcryptjs";
import { register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", (req, res) => {});

router.post("/logout", (req, res) => {});

export default router;
