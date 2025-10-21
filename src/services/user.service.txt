import { error } from "console";
import getConnection from "../config/database";

const handleCreateUser = async (
  fullName: string,
  email: string,
  address: string
) => {
  //insert to DB
  const myConnection = await getConnection();

  try {
    // await myConnection.query(
    //   `INSERT INTO users (name, email, address) VALUES ('${fullName}', '${email}', '${address}');`
    // );

    const sql =
      "INSERT INTO `users`(`name`, `email`, `address`) VALUES (?, ?, ?)";
    const values = [fullName, email, address];

    const [result, fields] = await myConnection.execute(sql, values);

    console.log("Insert a new User...");
  } catch {
    console.log("error: ", error);
  }
};

const getAllUsers = async () => {
  const myConnection = await getConnection();

  try {
    const [results, fields] = await myConnection.query("SELECT * FROM users");

    return results;
  } catch (err) {
    return [];
  }
};

const handleDeleteUser = async (id: number) => {
  const myConnection = await getConnection();

  try {
    const sql = "DELETE FROM `users` WHERE `id` = ? LIMIT 1";
    const values = [id];

    const [result, fields] = await myConnection.execute(sql, values);
  } catch {
    console.log("ERROR:", error);
  }
};

const getUserByID = async (id: number) => {
  const myConnection = await getConnection();

  try {
    const sql = "SELECT * FROM `users` WHERE `id` = ?";
    const values = [id];

    const [result, fields] = await myConnection.execute(sql, values);
    return result[0];
  } catch {
    console.log("ERROR:", error);
  }
};
const handleUpdateUser = async (
  id: number,
  name: string,
  email: string,
  address: string
) => {
  try {
    const myConnection = await getConnection();
    const sql =
      "UPDATE `users` SET `name` = ?, `email` = ?, `address` = ?  WHERE `id` = ? LIMIT 1";
    const values = [name, email, address, id];

    const [result, fields] = await myConnection.execute(sql, values);
  } catch {
    console.log("ERROR:", error);
  }
};

export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  getUserByID,
  handleUpdateUser,
};
