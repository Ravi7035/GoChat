import express from "express";

const app=express();

const port=5000;


app.use(express.json());

app.listen(port,()=>
{
    console.log("server running");
}
);


