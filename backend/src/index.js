import express from "express";

const app=express();

const port =5001;

app.use(express.json());

app.listen(port);


