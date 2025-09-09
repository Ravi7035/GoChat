import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectroute=async (req,res,next)=>
{
    try{
        const token =req.cookies.jwt;
        if (!token)
        {
            return res.status(401).send("not authorized please login");
        }

        const decoded=jwt.verify(token,JWT_SECRET);

        if(!decoded){

            return res.json(401).send("token is invalid");
        }

        const user=User.findById(decoded.userId).select("-password");

        if (!user)
        {
            return res.json(401).send("user not found");
        }

        req.user()

        next()
    }

    catch(err)
    {  
        res.json(401).send("internal server error");
        console.log("error occured",err.message);
    }
}
