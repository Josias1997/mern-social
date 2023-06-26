import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/posts/", postRouter);

app.use("/api/auth/", authRouter);

app.use("/api/users", userRouter);

// app.use("/api/comments/", postRouter);

// app.use("/api/likes/", postRouter);

// app.use("/api/stories/", postRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is listening");
});
