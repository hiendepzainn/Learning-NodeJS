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
    await myConnection.query(
      `INSERT INTO users (name, email, address) VALUES ( "${fullName}", "${email}", "${address}");`
    );
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
