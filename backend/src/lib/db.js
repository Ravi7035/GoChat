import mongoose from "mongoose";
export const connectdb=()=>
    {
        mongoose.connect(process.env.MONGODB_URL);
    }