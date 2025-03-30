import connection from "../db.js";

export const getUsers = async (_, res, next) => {
  try {
    const q = "SELECT * FROM users";
    const [data] = await connection.execute(q);
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching users:", err);
    return next(err);
  }
};

export const addUser = async (req, res, next) => {
  try {
    const q = "INSERT INTO users (user_name, email, phone, birth_date) VALUES (?, ?, ?, ?)";
    const values = [req.body.user_name, req.body.email, req.body.phone, req.body.birth_date];
    
    const [result] = await connection.execute(q, values);
    
    return res.status(201).json({ 
      message: "User successfully created.", 
      id: result.insertId
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const q = "UPDATE users SET user_name = ?, email = ?, phone = ?, birth_date = ? WHERE id = ?";
    const values = [req.body.user_name, req.body.email, req.body.phone, req.body.birth_date, req.params.id];

    await connection.execute(q, values);

    return res.status(200).json({ message: "User successfully updated." });
  } catch (err) {
    console.error("Error updating user:", err);
    return next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const q = "DELETE FROM users WHERE id = ?";
    await connection.execute(q, [req.params.id]);
    return res.status(200).json({ message: "User successfully deleted." });
  } catch (err) {
    console.error("Error deleting user:", err);
    return next(err);
  }
};
