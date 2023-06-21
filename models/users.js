import db from "../connect.js";

export const getUserById = (userId) => {
  const query = "SELECT * from users where id = ?";
  db.query(query, [userId], (err, data) => {
    if (err) return "error";
    return data[0];
  });
};
