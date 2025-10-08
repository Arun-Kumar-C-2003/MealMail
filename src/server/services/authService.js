// src/server/services/authService.js
import DBConnect from "../db";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Get users collection
export async function getUserCollection() {
  const dbInstance = new DBConnect();
  const connectDb = await dbInstance.connect();
  return connectDb.collection("users");
}

// LOGIN USER (for NextAuth CredentialsProvider)
export async function loginUser(email, password) {
  try {
    const dbInstance = new DBConnect();
    const connectDb = await dbInstance.connect();
    const userCollection = connectDb.collection("users");

    const user = await userCollection.findOne({ email });
    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid email or password" };
    }

    return {
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
    };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "Login failed" };
  }
}

// REGISTER USER
export async function registerUser(username, email, password) {
  try {
    const dbInstance = new DBConnect();
    const connectDb = await dbInstance.connect();
    const userCollection = connectDb.collection("users");

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await userCollection.insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "Registration successful",
      user: {
        id: result.insertedId.toString(),
        username,
        email,
      },
    };
  } catch (error) {
    console.error("Registration Error:", error);
    return { success: false, message: "Registration failed" };
  }
}
