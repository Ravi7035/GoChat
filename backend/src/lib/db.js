import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
export const connectdb=async ()=>
    {
        try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Mongoose connection error:", error);
    process.exit(1); // Stop server if DB connection fails
  }
    }