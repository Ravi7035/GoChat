import User from "../models/modeldb.js";
import bcrypt from "bcryptjs";


import signupschema from "./format.controller.js";
import { generateToken } from "../lib/utils.js";

export const signup=async (req,res)=>
{ 
  const {email,username ,password}=req.body; 

  const result=signupschema.safeParse(req.body);
  if(!(result.success)){
    return res.status(400).json(result.error.errors);
  }

  if (await User.findOne({email})){

    res.send("user already exists");
  }
  try{

    const saltrounds=10;
    const hashpassword=await bcrypt.hash(password,saltrounds);
  
    const newuser= new User({
    email,
    username,
    password:hashpassword
  });
   if(newuser)
   {
    generateToken(newuser._id,res);

    await newuser.save();

     return res.status(201).json({
        _id:newuser._id,
        email:newuser.email,
        username:newuser.username,
        password:newuser.password,
        profile_pic:newuser.profile_pic
    })
}
    else
        {
        return res.status(400).send("inputs are not valid");
     }

    }

    catch{
        return res.status(400).send(err.message);
        console.log("internal error occurs check out once");
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

