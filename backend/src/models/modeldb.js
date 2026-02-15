import mongoose from "mongoose";

const Userschema =new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        username:{
            type:String,        
            required:true
        },
        password:{
            type:String,
            required:true
        },
        profile_pic:
        {
            type:String,
            default:""
        }
    },
    {timestamp:true}
);

const User=mongoose.model("User",Userschema);

export default User;

    