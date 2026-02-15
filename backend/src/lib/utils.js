import jwt from "jsonwebtoken";

export const generateToken=(userId,res)=>
{
    const token=jwt.sign({userId},process.env.JWT_SECRET,
        {
            expiresIn:"10d"
        }
    );
    res.cookie("jwt",token,{
        sameSite:"lax",
        maxAge:10*24*60*60*1000,
        httpOnly:true,
        secure:process.env.NODE_ENV ==="Production"
    });

    return token
}
