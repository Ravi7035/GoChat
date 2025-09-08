import express from "express";

const router = express.Router();

router.get("signup",(req,res)=>
{
    console.log("signup route");
});
router.get("login-in",(req,res)=>
{
    console.log("login route");
});
router.get("logout",(req,res)=>
{
    console.log("logout route");
}
);
export default router;
