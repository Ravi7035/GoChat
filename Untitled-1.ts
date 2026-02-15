import express from "express";
import mongoose from "mongoose";

const app=express();

const port=5003;

app.listen(port,()=>
{
    console.log("running on port 5003");
})


mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
