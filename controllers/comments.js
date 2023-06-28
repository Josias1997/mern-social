import db from "../connect.js";

export const addComment = (req, res) => {
  const content = req.body.content;
  const userId = req.body.userId;
  const postId = req.body.postId;
  const query =
    "INSERT INTO comments (`content`, `user_id`, `post_id`) VALUES (?, ?, ?)";
  db.query(query, [content, userId, postId], (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(200).json({ message: "Comment added successfully" });
  });
};

export const getPostComments = (req, res) => {
  const postId = req.params.postId;

  const query =
    "SELECT c.*, username, profile_image from comments as c JOIN users as u ON c.user_id = u.id JOIN profile as p on p.user_id = c.user_id WHERE c.post_id = ?";
  db.query(query, [postId], (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    console.log(data);
    return res.status(200).json({ comments: data });
  });
};
