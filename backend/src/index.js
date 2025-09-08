import express from "express";

const app=express();

const port=5000;

import authroutes from "./routes/auth.route.js";

app.use("/api/auth",authroutes);


app.use(express.json());

app.listen(port,()=>
{
    console.log("server running");
}
);


