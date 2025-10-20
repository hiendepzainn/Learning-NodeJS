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

    console.log(result);
    console.log(fields);

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

export { handleCreateUser, getAllUsers };
