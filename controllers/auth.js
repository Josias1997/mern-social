import db from "../connect.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const q = "SELECT * FROM users where email = ?";

  db.query(q, [email], (err, users) => {
    if (err) return res.status(500).json({ message: err.message });
    if (users.length > 0) {
      return res.status(404).json({ message: "This email is already taken" });
    } else {
      const hashedPassword = bcrypt.hashSync(password, 8);
      const query =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        return res
          .status(200)
          .json({ message: "User registered successfully" });
      });
    }
  });
};

export const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const query = "SELECT * from users where email = ?";

  db.query(query, [email], (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    if (data.length === 0) {
      return res.status(404).json({ message: "Email incorrect" });
    } else {
      const user = data[0];
      if (bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ user });
      } else {
        return res.status(404).json({ message: "Password incorrect" });
      }
    }
  });
};
