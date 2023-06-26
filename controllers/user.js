import db from "../connect.js";

export const getUser = (req, res) => {
  const id = req.params.userId;

  const query =
    "SELECT p.*, username, email from profile as p JOIN users as u ON p.user_id = u.id WHERE u.id = ?";

  db.query(query, [id], (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    if (data.length > 0) {
      return res.status(200).json({ user: data[0] });
    } else {
      const userQuery = "SELECT username, email from users where id = ?";
      db.query(userQuery, [id], (err, data) => {
        if (err) return res.status(500).json({ message: err.message });
        if (data.length > 0) {
          return res.status(200).json({ user: data[0] });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      });
    }
  });
};

export const editProfile = (req, res) => {
  const userId = req.params.userId;
  const city = req.body.city;
  const website = req.body.website;

  const profileImage = req.files["profile_image"][0];
  const coverImage = req.files["cover_image"][0];

  console.log(city, website, profileImage, coverImage);
  const query =
    "INSERT INTO profile (`profile_image`, `cover_image`, `city`, `website`, `user_id`) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      `users/${profileImage.filename}`,
      `users/${coverImage.filename}`,
      city,
      website,
      userId,
    ],
    (err, data) => {
      if (err) return res.status(500).json({ message: err.message });
      return res.status(200).json({
        profile: {
          city,
          website,
          coverImage: `users/${coverImage.filename}`,
          profileImage: `users/${profileImage.filename}`,
        },
      });
    }
  );
};
