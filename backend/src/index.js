import express from "express";

const app=express();

const port=5000;

import authroutes from "./routes/auth.route.js";

app.use(express.json());

app.use("/api/auth",authroutes);

app.listen(port,()=>
{
    console.log("server running");
}
);


