import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth/", authRouter);

app.use("/api/posts/", postRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is listening");
});
