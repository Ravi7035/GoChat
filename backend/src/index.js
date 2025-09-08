import express from "express";

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
}
);


