import mongoose from "mongoose";
const userschema=mongoose.Schema(
    {
        sender_id:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        receiver_id:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        text:
        {
            type:String
        },
        image:
        {
            type:String
        }
    }
);
const message=mongoose.model(message,"userschema");

export default message;