import User from "../models/modeldb.js";

import {z} from "zod";

import signupschema from "./format.controller.js";

export const signup=async (req,res)=>
{ 
  const {email,username ,password}=req.body; 

  const result=await signupschema.safeParse(req.body);
  if(!(result)){
    res.status(400).send(result.error.errors);
  }

  if (User.findOne({email})){

    res.send("user already exists");
  }
  try{
  const user=await new User({
    email,
    username,
    password
  });
   user.save();

  res.status(201).send("signup successful")
    }

    catch{
        res.status(400).send(err.message);
    }
}
export const login=(req,res)=>
{
    res.json();
};

export const logout=(req,res)=>
{
    res.json();
};

