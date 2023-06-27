import db from "../connect.js";

export const uploadFile = (req, res) => {
  return res.status(200).json({ file: req.file });
};

export const addPost = (req, res) => {
  const userId = req.body.user_id;
  const description = req.body.description;
  const image = req.body.image;

  const query =
    "INSERT INTO posts (`description`, `image`, `user_id`) VALUES (?,?,?)";
  db.query(query, [description, image, userId], (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(200).json({ message: "Post added successfully!" });
  });
};

export const getPosts = (req, res) => {
  const query =
    "SELECT p.*, username from posts as p JOIN users as u ON p.user_id = u.id ORDER BY p.created_at DESC";
  db.query(query, (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(200).json({ posts: data });
  });
};

export const getUserPosts = (req, res) => {
  const userId = req.params.userId;

  const query = "SELECT * from posts WHERE user_id = ?";
  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(200).json({ posts: data });
  });
};

export const deletePost = (req, res) => {
  const postId = req.params.postId;
  const query = "DELETE from posts where id = ?";
  db.query(query, [postId], (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(200).json({ message: "Post deleted successfully" });
  });
};
