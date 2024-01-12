// db.js
import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URI = process.env.DB_CONNECTION_STRING;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
