import User from "../models/modeldb.js";
import bcrypt from "bcryptjs";
import signupschema from "./format.controller.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.utility.js"

export const signup=async (req,res)=>
{ 
  const {email,username ,password}=req.body; 

  if (!(email) || !(username) || !(password))
  {
    return res.status(400).send("all fields are required!");
  }

  const result=signupschema.safeParse(req.body);
  if(!(result.success)){
    return res.status(400).json(result.error.errors);
  }


  if (await User.findOne({email})){

    res.status(400).send("email already exists");
  }
  if (await User.findOne({username}))
  {
    res.status(400).send("username already exists");
  
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
        console.log("internal error occurs check out once");
        return res.status(400).send(err.message);
        
    }
}
export const login=async (req,res)=>
{
    const {username,password}=req.body;

    const user=await User.findOne({username});
    try{
    if (!(user)){
        return res.status(500).send("invalid username or password");
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);

    if (!(isPasswordValid)){
        return res.status(500).send("invalid username or password");
    }
    generateToken(user._id,res);
    return res.status(201).send("login successful");

   
}
    catch(err)
    {
        res.status(500).json({
           "message":"server upheld try again"
        })
        console.error("internal server error",err.message);
    }
    

   
};

export const logout=(req,res)=>
{
    try{

        res.cookie("jwt","",{maxAge:0});
        res.status(201).send("login successful");
    }
    catch(err)
    {
        res.status(500).send("internal server error");
        console.log("error occurred",err.message);
    }
    

};

export const updateprofile = async (req, res) => {
  try {
    const { profilepic } = req.body;  
    const userId = req.user._id;

    if (!profilepic) {
      return res.status(400).send("No image provided");
    }

   
    const uploadResponse = await cloudinary.uploader.upload(profilepic, {
      folder: "GO_CHAT",
    });

    console.log(uploadResponse);

  
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profile_pic: uploadResponse.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      message: "Profile picture updated successfully",
      profile_pic: updatedUser.profile_pic,
    });
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).send("Server error");
  }
};