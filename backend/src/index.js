import express from "express";
import {connectdb} from "./lib/db.js"
import mongoose from "mongoose";

import dotenv from "dotenv";
import authroutes from "./routes/auth.route.js";

dotenv.config();

const app=express();

const port=process.env.PORT




app.use(express.json());

app.use("/api/auth",authroutes);

app.listen(port,()=>
{
    console.log("server running");
    connectdb();
    mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected to MongoDB");
});

    mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
});

    mongoose.connection.on("disconnected", () => {
    console.log("Mongoose is disconnected");
});

}
);


