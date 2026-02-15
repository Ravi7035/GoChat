import express from "express";
import { connectdb } from "./lib/db.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { protectroute } from "./middleware/authmiddleware.js";
import cors from "cors";
import dotenv from "dotenv";
import authroutes from "./routes/auth.route.js";
import messageroutes from "./routes/messages.routes.js";
import { app, server } from "./lib/socket.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

/* =========================
   Middleware
========================= */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://gochat-1-vpu4.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

/* =========================
   API Routes
========================= */

app.use("/api/auth", authroutes);
app.use("/api/messages", protectroute, messageroutes);

/* =========================
   Production Static Setup
========================= */

if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // backend/src → backend → GOCHAT → frontend
  const frontendPath = path.join(
    __dirname,
    "../../frontend/vite-project/dist"
  );
  

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

/* =========================
   Start Server
========================= */

const port = process.env.PORT || 5002;

connectdb()
  .then(() => {
    console.log("MongoDB connected ✅");

    server.listen(port, () => {
      console.log(`Server running on port ${port} 🚀`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected ❌");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
