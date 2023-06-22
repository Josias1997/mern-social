import db from "../connect.js";

export const getUserById = (userId) => {
  const query = "SELECT * from users where id = ?";
  db.query(query, [userId], (err, data) => {
    if (err) return err.message;
    return data[0];
  });
};

export const createUser = (email, username, password) => {
  const query =
    "INSERT INTO user (`email`, `password`, `username`) VALUES (?, ?, ?)";
  db.query(query, [email, password, username], (err, data) => {
    if (err) return err.message;
    return { email, username, password };
  });
};

export const checkIfEmailExists = (email) => {
  const query = "SELECT * FROM users where email = ?";
  db.query(query, [email], (err, users) => {
    if (err) return err.message;
    if (users.length > 0) {
      return { message: "Email already taken" };
    } else {
      return false;
    }
  });
};
