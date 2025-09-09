import User from "../models/modeldb.js";
import message from "../models/messagesdb.js";

export const getusers=async (req,res)=>
{
    try{
    const userid=req.user._id;

    const users= await User.find({_id : {ne : userid}});

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

export const getmessages =async (req,res)=>
{
    try{

        const {id:UsertoChat} = req.params;
        const myId=req.user._id;

        const messages=message.find(
            {
                $or:[
                    {sender_id:myId,receiver_id:UsertoChat},
                    {receiver_id:UsertoChat,sender_id:myId}
                ]
            }
        );

        res.status(201).json(
            {
                messages
            }
        );
    }
    catch(err)
    {
        res.status(400).send("internal server error");
        console.log("error occurred",err.message);
    }
}
