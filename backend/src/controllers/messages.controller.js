import User from "../models/modeldb.js";

export const getusers=(req,res)=>
{
    try{
    const userid=req.user._id;

    const users=User.find({_id : {ne : userid}});

    res.status(201).json({
        users
    }
);
    }
    catch(error)
    {
        res.status(400).send("internal server error");
        console.log("something wrong",error.message);
        }
}

