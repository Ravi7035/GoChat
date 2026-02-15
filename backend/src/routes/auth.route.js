import express from "express";

import {signup,login,logout, updateprofile,checkauth} from "../controllers/auth.controller.js"

import { protectroute } from "../middleware/authmiddleware.js";  
const router = express.Router();
router.post("/signup", signup);
router.post("/login",login);
router.post("/logout",logout);
router.put("/updateprofile",protectroute,updateprofile);
router.get("/check",protectroute,checkauth);
export default router;
    